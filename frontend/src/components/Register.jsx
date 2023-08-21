import "../css/RegisterForm.css";
// import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2 className="mb-3 text-center">Register</h2>
        <form autoComplete="off">
          <div className="form-group mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" id="name" className="form-control" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" className="form-control" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="ConfPass" className="form-label">
              Confirm Password
            </label>
            <input type="password" id="ConfPass" className="form-control" />
          </div>
          <button type="submit" className="btn btn-success mt-2 w-100">
            Register
          </button>
        </form>
        <Link to="/login" className="btn btn-primary mt-3 w-100">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
