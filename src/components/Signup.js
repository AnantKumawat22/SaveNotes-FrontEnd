import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  // To hide the Navbar window.
  const collapse = document.querySelector(".navbar-collapse");
  if (collapse) collapse.classList.remove("show");

  // const host = `http://localhost:8000`;
  const host = `https://savenotes-backend.onrender.com`;

  // Enter Fields by user.
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // To use navigation.
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  // On form Submit.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the value, entered by user.
    const { name, email, password, cpassword } = cred;

    if(password !== cpassword){
      props.showAlert("Password and Confirm Password didn't matched.", "danger");
      return;
    }

    // API CALL
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    // Check if everything Okay.
    if (data.success) {
      // Store token and username in localStorage.
      localStorage.setItem("token", data.authtoken);
      localStorage.setItem("username", data.username);
      navigate("/");

      // Alert
      props.showAlert("Account Created Successfully.", "success");
    } else {
      // Alert
      props.showAlert(data.msg, "danger");
    }
  };

  // Set value in Input fields 
  const inpChange = (e) => {
    // console.log(e.target.name);
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black border-0">
              <div className="card-body crd-bdy p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      <u>Sign up</u>
                    </p>

                    {/* SignUp Form */}
                    <form className="mx-1 mx-md-4 mb-5" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row mb-4">
                        <i
                          className="fas fa-user fa-lg me-3 fa-fw mr-3"
                          style={{ lineHeight: "40px" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">

                          {/* Name:- Input and Label */}
                          <input
                            type="text"
                            className="form-control"
                            value={cred.name}
                            onChange={inpChange}
                            id="name"
                            name="name"
                            aria-describedby="nameHelp"
                          />
                          <label className="form-label" htmlFor="name">
                            Enter Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row mb-4">
                        <i
                          className="fas fa-envelope fa-lg me-3 fa-fw mr-3"
                          style={{ lineHeight: "40px" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                        
                          {/* Email:- Input and Label */}
                          <input
                            type="email"
                            className="form-control"
                            value={cred.email}
                            onChange={inpChange}
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                          />
                          <label className="form-label" htmlFor="email">
                            Enter Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row mb-4">
                        <i
                          className="fas fa-lock fa-lg me-3 fa-fw mr-3"
                          style={{ lineHeight: "40px" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">

                          {/* password:- Input and Label */}
                          <input
                            type="password"
                            className="form-control"
                            value={cred.password}
                            onChange={inpChange}
                            id="password"
                            name="password"
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row mb-4">
                        <i
                          className="fas fa-key fa-lg me-3 fa-fw mr-3"
                          style={{ lineHeight: "40px" }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">

                          {/* Confirm password:- Input and Label */}
                          <input
                            type="password"
                            className="form-control"
                            value={cred.cpassword}
                            onChange={inpChange}
                            id="cpassword"
                            name="cpassword"
                          />
                          <label className="form-label" htmlFor="cpassword">
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                        {/* Register Button */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    {/* SignUp Image */}
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
