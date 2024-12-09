import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>

      <ul className="navbar-list d-flex justify-content-between">

        <div className="d-flex">
          <li><Link to="/" className="navbar-home ms-5">ender</Link></li>
        </div>

        <div className="d-flex">
          <li><Link to="/trova" className="navbar-single-list me-5">trova</Link></li>
          <li><Link to="/crea" className="navbar-single-list me-5">crea</Link></li>
          <li><Link to="/stupiscimi" className="navbar-single-list me-5">upgrade</Link></li>
          <li><Link to="/login" className="navbar-single-list me-5"><img
              src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
              alt="Profilo"
              className="foto-profilo me-2"
            />LOGIN</Link></li>
          <li><Link to="/" className="navbar-home me-5">home</Link></li>
        </div>

      </ul>
    </div>
  );
};

export default NavBar;