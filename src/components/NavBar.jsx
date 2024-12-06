import { Link } from "react-router-dom";

const NavBar = () => {

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

                <Link to="/login" className="navbar-single-list">
                              <img
        src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
        alt="Profilo"
        className="foto-profilo me-2"
    />
                Login
                </Link>
              </li>
            </ul>
          </div>
        );
    }

    export default NavBar