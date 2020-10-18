import React from 'react'
import '../App.css'
// import logo from './sustaita-logo.PNG'

export default function Footer() {
    return (
        <div className="container" >
            <div className='row footer text-center' >
                <div className="col-sm-1"></div>
                <div className="logo col-sm-3 text-left">
                    {/* <img src={logo} width="180" height="75" /> */}
                    <div className="footer-text"><span style={{ fontWeight: 'bold', color: 'lightblue', letterSpacing: '2px', textTransform: 'uppercase' }}>Sustaita Logistics</span>  </div>
                </div>
                <div className="logo col-sm-5 text-right">
                    {/* <img src={logo} width="180" height="75" /> */}
                    <div className="footer-text">Stampa® 2020 - powered by <span style={{ fontStyle: 'italic', color: 'lightblue' }}>iTechnologic</span> </div>
                </div>
            </div>
        </div>
    )
}
