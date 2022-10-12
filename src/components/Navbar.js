import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = (props) => {
  // To use navigation.
  let location = useLocation();
  let navigate = useNavigate();

  // LOG-OUT
  const handlelogout = () => {
    // Remove token and send user to login page.
    localStorage.removeItem("token");
    navigate("/login");

    // Log out alert.
    props.showAlert("Successfully Log out.", "success");
  };

  // To hide the Navbar window.
  const collapse = document.querySelector(".navbar-collapse");
  document.addEventListener("click", function (event) {
    if (event.target.closest(".navbar")) return;
    if (collapse) collapse.classList.remove("show");
  });

  return (

    // Navbar
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link
        className="navbar-brand"
        style={{ fontWeight: "500", letterSpacing: "0.5px" }}
        to="/"
      >
        SaveNotes
      </Link>

      {/* Menu Icon Button. */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">

          {/* Home Link */}
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>

          {/* About Link */}
          {/* <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About <span className="sr-only">(current)</span></Link>
                    </li> */}
        </ul>

        {/* Show LogIn, Signup, LogOut on the basis of logged-In(having token) or not. */}
        {!localStorage.getItem("token") ? (
          <form className="form-inline my-2 my-lg-0">

          {/* LogIn Button */}
            <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login
            </Link>

            {/* SignUp Button */}
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              Signup
            </Link>
          </form>
        ) : (
          <div className="d-flex flex-row" style={{ alignItems: "center" }}>

          {/* UserName */}
            <p
              className="text-light"
              style={{ height: "10px", padding: "0px 30px" }}
            >
              <i className="fa fa-user mr-1" aria-hidden="true"></i>{" "}
              {localStorage.getItem("username")}
            </p>

            {/* LogOut Button */}
            <button
              className="btn btn-primary mx-1"
              onClick={handlelogout}
              role="button"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
