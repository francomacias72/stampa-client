import React, { Component } from 'react'

class Stampa extends Component {
    render() {
        return (
            <div>
                <button onClick={() => window.print()}>PRINT</button>
                <p>Click above button opens print preview with these words on page</p>
            </div>
        )
    }
}

export default Stampa