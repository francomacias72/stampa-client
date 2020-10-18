import React from 'react'
import Select from 'react-select'
import '../App.css'
import { jsPDF } from "jspdf";


const customStyles = {
    singleValue: base => ({ ...base, color: '#79aec8' }),
    control: (base, state) => ({
        ...base,
        //color: state.isFocused ? 'red' : 'blue',
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
            color: 'white',
        }
    }
};
const serverName = 'USFLSTPFMACIAS'

class Forma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            partId: '1',
            part: '',
            description: '',
            country: '',
            client: '',
            nom: '',
            dir1: '',
            dir2: '',
            dir3: '',
            rfc: '',
            selectOptions: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleChange(event) {
        //get part number information
        let query = 'http://' + serverName + ':8000/parts/' + this.state.partId + '/'
        let res = await fetch(query);
        const data = await res.json();
        //get client information
        query = 'http://' + serverName + ':8000/clients/' + data.client_id + '/'
        res = await fetch(query);
        const cliente = await res.json();
        //get nom information
        query = 'http://' + serverName + ':8000/noms/' + data.nom_id + '/'
        res = await fetch(query);
        const norma = await res.json();
        this.setState({ partId: event.value, part: event.label, description: data.description, country: data.country, client: cliente.name, dir1: cliente.dir1, dir2: cliente.dir2, dir3: cliente.dir3, rfc: cliente.rfc, nom: norma.name });
        // alert(data.description)
    }

    async handleSubmit(event) {
        alert(this.state.partId)
        const query = 'http://' + serverName + ':8000/parts/' + this.state.partId + '/'
        alert(query)
        const res2 = await fetch(query);
        const data2 = await res2.json();
        // console.log(data2)
        alert(data2.description)
        // alert('espera')
        event.preventDefault();
        this.setState({ part: data2.number })
        // this.getdoc2()
    }



    getdoc2(np, desc, cty, cliente, dir1, dir2, dir3, rfc, qty, nom) {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
        });
        let x = 1, y = .2, gap = .18
        let fsize = 14, fsizeDetails = 7 //initial font size for header
        // LABEL HEADER
        doc.setFontSize(fsize)
        doc.text(nom, 2, y, { align: 'center' })

        doc.setFontSize(8)
        x = 1 //stop - doc.widthOfString(texto, 0, y)
        y += .2
        // alert(data2.number)
        // texto = np
        doc.text('Item:', x, y, { align: 'right' })
        doc.setFontSize(9)
        doc.text(np, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('Descripción:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(desc, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('Cantidad:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(qty, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('País de Origen:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(cty, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('Importador:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(cliente, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('Domicilio:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(dir1, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(dir2, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(dir3, 1.1, y)
        y += gap
        doc.setFontSize(8)
        doc.text('RFC:', x, y, { align: 'right' })
        doc.setFontSize(7)
        doc.text(rfc, 1.1, y)
        // doc.save("etiqueta.pdf");
        window.open(doc.output('bloburl'), '_blank')
    }

    async getOptions() {
        // const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const res2 = await fetch('http://' + serverName + ':8000/parts');
        const data2 = await res2.json();
        // const data = res.data
        const options = data2.map(d => ({
            "value": d.id,
            "label": d.number

        }))
        this.setState({ selectOptions: options })
    }
    componentDidMount() {
        this.getOptions()
        // this.createDocument()
        //this.getdoc2()
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row seccion">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4" >
                            <p className="field-names text-center">Número de Parte</p>
                            <Select
                                options={this.state.selectOptions}
                                onChange={this.handleChange.bind(this)}
                                styles={customStyles}
                            />
                        </div>
                        <div className="col-sm-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p className="field-names text-center">Cantidad</p>
                            <input className="field-box margen boton"
                                type="text"
                                value={this.state.value}
                                onChange={this.handleInputChange}
                                style={{ width: '80px', height: "40px", paddingLeft: '10px' }}
                            />
                        </div>
                        <div className="col-sm-2" style={{ display: 'flex', alignItems: 'flex-end' }} >
                            {/* <a onClick={() => this.getdoc2(this.state.part, this.state.description, this.state.country, this.state.client, this.state.dir1, this.state.dir2, this.state.dir3, this.state.rfc, this.state.value, this.state.nom)}
                            >Imprimir
                            </a> */}
                            <input id='boton' className="btn  btn-block "
                                value='IMPRIMIR'
                                onClick={() => this.getdoc2(this.state.part, this.state.description, this.state.country, this.state.client, this.state.dir1, this.state.dir2, this.state.dir3, this.state.rfc, this.state.value, this.state.nom)}
                                style={{
                                    background: 'linear-gradient(0deg, #1b2838, #79aec8)',
                                    color: 'white', textTransform: 'uppercase',
                                    letterSpacing: '2px', borderRadius: '30px',
                                    border: '0'
                                }}
                            />
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

export default Forma