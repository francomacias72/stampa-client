import React, { useState, useEffect } from 'react'
import '../App.css'

const ProjectForm = (props) => {
    let date = new Date()
    let partsArray = [{}]
    let regresar = 'NADA'
    console.log('START')
    async function partes() {
        const res = await fetch("http://localhost:8000/parts");
        let partes = await res.json()
        //console.log('RES: ', res)
        console.log('PARTES: ', partes)
        partes.map(x => {
            regresar += '<p>' + x.id + '</p>'
        })
        console.log("REGRESAR:  ", regresar)
        return (regresar)
    }
    //partes()


    const initalFieldValues = {
        name: '',
        description: '',
        part: 1,
        cantidad: 1,
        partes: [],
        owner: 'Franco',
        status_id: 1,
        priority: 2,
        eta: date,
        followUp: date,
        wf_creation: date,
    }
    let [values, setValues] = useState(initalFieldValues)
    //console.log('current id: ', props.currentId)

    async function getParts() {
        console.log('dentro de getparts START')
        const res = await fetch("http://localhost:8000/parts");
        console.log('dsps de fetch')
        //partsArray = await res.json();
        console.log('RES JSON', res)
        // partsArray.map(p => {
        //     options.push({
        //         value: p.id, label: p.number
        //     })
        // })
    }

    useEffect(() => {
        // console.log('antes d iniciar getparts')
        // renderParts()
        // console.log('PARTS ARRAY: ', partsArray)
        if (props.currentId == '')
            setValues({
                ...initalFieldValues
            })
        else
            // console.log('este es el ELSE')
            setValues({
                ...props.currentId
                // ...props.projectsH[props.currentId]
            })
    }, [props.currentId, props.projectsH])

    const handleInputChange = e => {
        let { name, value } = e.target
        // console.log('si entra input change for: ', name, value)
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values)

    }


    return (
        <div className="container">
            <div className="row seccion">
                <div className="col-sm-2"></div>
                <div class="col-sm-4">
                    <select>{partsArray.map((x) => <option key={x.id}>{x.number}</option>)}</select>

                    <select className="custom-select mr-sm-2" id="part" name="part"
                        value={values.part}
                        onChange={handleInputChange} >
                        <option value="3" >CI</option>
                        <option value="4">PS</option>
                    </select>
                </div>
                <div className="col-sm-2">
                    <input type="text" className="form-control" placeholder="Cantidad" name="cantidad"
                        value={values.cantidad}
                        onChange={handleInputChange} />
                </div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <table className='table table-dark'>
                    <thead>
                        <tr >
                            <th style={{ minWidth: "400px" }}>Name</th>
                            <th >Div</th>
                            <th>Client</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Prty</th>
                            <th>ETA</th>
                            <th>Follow</th>
                            <th>Creation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <input type="text" className="form-control" placeholder="Name" name="name"
                                    value={values.name}
                                    onChange={handleInputChange} />
                            </th>
                            <th>
                                <select className="custom-select mr-sm-2" id="division_id" name="division_id"
                                    value={values.division_id}
                                    onChange={handleInputChange} >
                                    <option value="3" >CI</option>
                                    <option value="4">PS</option>
                                </select>
                            </th>

                            <th>
                                <input type="submit" className="btn btn-primary btn-block" value={props.currentId == '' ? "Save" : "Update"} />
                            </th>
                        </tr>

                    </tbody>
                </table>
                <div className="row" style={{ margin: "0 15px", marginBottom: "20px" }}>
                    <span >
                        <textarea className="form-control col-md-12" placeholder="Description" name="description"
                            value={values.description} cols="1000"
                            onChange={handleInputChange} />
                    </span>
                </div>

            </form>
        </div>
    )
}

export default ProjectForm
