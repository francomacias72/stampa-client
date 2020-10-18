import React, { useState, useEffect, Component } from 'react'
import Select from 'react-select'


export default function SelectReact() {


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <Select
                placeholder='Buscar'
                options={options} />

        </div>
    )
}


