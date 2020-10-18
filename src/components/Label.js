import React, { Fragment, useState, useEffect } from 'react'
import Moment from 'moment';
import Select from 'react-select'
import Header from './Header'
import { jsPDF } from "jspdf";
import ProjectForm from './ProjectForm';


const Label = () => {

    const initalFieldValues = {
        cantidad: 1
    }

    let [values, setValues] = useState(initalFieldValues)
    // let [cantidad, setCantidad] = useState(1)
    let [partId, setPartId] = useState(0)
    let [options, setOptions] = useState([{}])


    const customStyles = {
        control: (base, state) => ({
            ...base,
            color: 'white',
            background: "#0d131b",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "grey" : "#284574",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "#284574" : "green"
            }
        }),
        input: () => ({ color: 'white' }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#ffffff',
            }
        }
    };

    const handleFormSubmit = e => {
        e.preventDefault()
    }
    const handleInputChange = e => {
        let { name, value } = e.target
        // console.log('si entra input change for: ', name, value)
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleSelectChange = e => {
        // console.log(e)
        setPartId = e.value
    }

    async function getParts() {
        console.log('starts get parts')
        const res = await fetch("http://localhost:8000/parts");
        const partsArray = await res.json();
        partsArray.map(p => {
            options.push({
                value: p.id, label: p.number
            })
        })
    }

    useEffect(() => {
        // Update the document title using the browser API
        // document.title = 'Stampa - Sustaita ';
        document.title = "Part ID: " + partId
        getParts();
        setValues({
            ...initalFieldValues
        })
    });

    function createDocument() {
        console.log(options)
        alert("PART: " + partId + " cantidad: " + values.cantidad)
        // Landscape export, 2×4 inches
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
        });
        let x = 1, y = .2, gap = .18
        let fsize = 14, fsizeDetails = 7 //initial font size for header
        let stop = 65 // 1st column align right at this point
        let izq = 75 // second column align left at this point
        let texto = ''

        // LABEL HEADER
        doc.setFontSize(fsize)
        doc.text('NOM-050-SCFI-2004', x, y)

        doc.setFontSize(8)
        x = 1 //stop - doc.widthOfString(texto, 0, y)
        y += .2

        doc.text('Item:', x, y, { align: 'right' })
        y += gap
        doc.text('Description:', x, y, { align: 'right' })
        y += gap
        doc.text('Cantidad:', x, y, { align: 'right' })
        y += gap
        doc.text('País de Origen:', x, y, { align: 'right' })
        y += gap
        doc.text('Importador:', x, y, { align: 'right' })
        y += gap
        doc.text('Domicilio:', x, y, { align: 'right' })
        y += gap
        doc.text('', x, y, { align: 'right' })
        y += gap
        doc.text('', x, y, { align: 'right' })
        y += gap
        doc.text('RFC:', x, y, { align: 'right' })

        // doc.save("two-by-four.pdf");
    }

    return (
        <div className="container">
            <Header />
            <form action="">
                <div class="row seccion">
                    <div className="col-sm-2"></div>
                    <div class="col-sm-4">
                        <p className="field-names text-center">Número de Parte</p>
                        <div style={{}}>
                            <Select
                                options={options}
                                onChange={handleSelectChange}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <p className="field-names text-center">Cantidad</p>
                        <div className="">
                            <input type="text" className="form-control field-box" placeholder="Cantidad" name="cantidad"
                                value={values.cantidad}
                                onChange={handleInputChange}
                                style={{ maxWidth: '100px' }}
                            />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div style={{ paddingTop: '40px' }}>
                            <input type="submit"
                                className="btn btn-success btn-block"
                                value='Imprimir'
                                style={{ width: '100px' }}
                                onClick={createDocument}

                            />
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleFormSubmit}>
            </form>
            <ProjectForm />
        </div>
    )
}

export default Label

