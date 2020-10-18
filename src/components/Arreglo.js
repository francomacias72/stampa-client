import React, { Component } from 'react'
import Select from 'react-select'
// import axios from 'axios'
import '../App.css'
import { jsPDF } from "jspdf";

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

export default class Arreglo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
            id: 1,
            name: '',
            number: '',
            cantidad: 1
        }
    }

    async getOptions() {
        // const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const res2 = await fetch("http://localhost:8000/parts");
        const data2 = await res2.json();
        // const data = res.data
        const options = data2.map(d => ({
            "value": d.id,
            "label": d.number

        }))

        this.setState({ selectOptions: options })

    }

    handleChange(e) {
        this.setState({ id: e.value, number: e.label })
    }

    handleInputChange(e) {
        this.setState({ cantidad: e.value })
        //console.log('cantidad en input change: ', this.state.cantidad)
    }

    componentDidMount() {
        this.getOptions()
    }

    createDocument() {
        // Landscape export, 2×4 inches
        // alert('parte: ', this.state.id)
        //alert('cantidad: ', (e) => this.state.cantidad)
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

    handleChange2(event) {
        this.setState({ value: event.target.value });
    }
    handleFormSubmit = e => {
        e.preventDefault()

    }


    render() {
        //console.log(this.state.selectOptions)
        return (
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange2} />
                    <div className="row seccion">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <p className="field-names text-center">Número de Parte</p>
                            <Select
                                options={this.state.selectOptions}
                                onChange={this.handleChange.bind(this)}
                                styles={customStyles}
                            />
                        </div>
                        <div className="col-sm-2">
                            <p className="field-names">Cantidad</p>
                            <input type="text" className="form-control field-box" placeholder="Cantidad" name="cantidad"
                                value={this.state.cantidad}
                                onChange={this.handleInputChange.bind(this)}
                                style={{ maxWidth: '100px' }}
                            />
                        </div>
                        <div class="col-sm-4">
                            <div style={{ paddingTop: '40px' }}>
                                <input type="submit"
                                    className="btn btn-success btn-block"
                                    value='Imprimir'
                                    style={{ width: '100px' }}
                                    onClick={() => console.log(this.state.cantidad)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}