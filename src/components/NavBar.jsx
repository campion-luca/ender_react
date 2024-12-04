import { Link } from "react-router-dom";

export function NavBar() {

        return (

          <div className="navbar-container">

            <ul className="navbar-list">
              <li>
                <Link to="/crea" className="navbar-single-list">Crea</Link>
              </li>
              <li>
                <Link to="/trova" className="navbar-single-list">Trova</Link>
              </li>
              <li>
                <Link to="/" className="navbar-home">HOME</Link>
              </li>
              <li>
                <Link to="/stupiscimi" className="navbar-single-list">Stupiscimi</Link>
              </li>
              <li>
                <Link to="/contact" className="navbar-single-list">Contact</Link>
              </li>
            </ul>
          </div>
        );
    }