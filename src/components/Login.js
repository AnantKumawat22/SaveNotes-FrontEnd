import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  // To hide the Navbar window.
  const collapse = document.querySelector(".navbar-collapse");
  if (collapse) collapse.classList.remove("show");

  // const host = `http://localhost:8000`;
  const host = `https://savenotes-backend.onrender.com/`;
  
  const [cred, setCred] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API CALL
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      localStorage.setItem('username', data.username);
      navigate("/");
      props.showAlert("Logged in Successfully.", "success");
    }
    else {
      props.showAlert(data.msg, "danger");
    }
  }

  const inpChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h2 className='mb-3 login-h2'><u>LOGIN</u></h2>

              <form onSubmit={handleSubmit} className="mb-5">
                <div className="form-outline mb-4">
                  <input type="email" value={cred.email} onChange={inpChange} id="email" name="email" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" value={cred.password} onChange={inpChange} id="password" name="password" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <Link to="#!">Forgot password?</Link>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <Link className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#55acee' }} to="#!"
                  role="button">
                  <i className="fab fa-google me-2 mr-2"></i> Continue with Google</Link>
                <Link className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#3b5998' }} to="#!"
                  role="button">
                  <i className="fab fa-facebook-f me-2 mr-2"></i> Continue with Facebook
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;