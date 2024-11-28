import { Component } from "react";

class Footer extends Component {
    render () {
        return (
            <ul className="bg-body-tertiary d-flex list-unstyled justify-content-center fixed-bottom mb-0 py-3">
                <li className="pe-5">Chi siamo?</li>
                <li className="pe-5">Dove siamo?</li>
                <li className="pe-5">Cosa cerchiamo?</li>
                <li className="pe-5">Non so'</li>
            </ul>
        )
    }
}

export default Footer