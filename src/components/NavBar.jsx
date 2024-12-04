import { Component } from "react";

class NavBar extends Component {
    render () {
        return (

          <div className="navbar-container">

            <ul className="navbar-list">
              <li>
                <a href='#boh' className="navbar-single-list">Crea</a>
              </li>
              <li>
                <a href='#boh' className="navbar-single-list">Trova</a>
              </li>
              <li>
                <a href='#boh' className="navbar-home">HOME</a>
              </li>
              <li>
                <a href="#about" className="navbar-single-list">About</a>
              </li>
              <li>
                <a href="#contact" className="navbar-single-list">Contact</a>
              </li>
            </ul>
          </div>
        )


    }
}

export default NavBar