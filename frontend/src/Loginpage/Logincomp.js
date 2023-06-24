import React, { useState, useEffect } from "react";
import logodannama from "../Photos/logodannama.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import ProfileAdmincomp from "../Homepage/ProfileAdmincomp";
import PropTypes from 'prop-types'

const Logincomp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "adam",
      password: "adam",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    window.location.href = "./ProfileAdmin";

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(` ${process.env.REACT_APP_API_URL}/login/`, database)
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error" style={{ color: "red" }}>
        {errorMessages.message}
      </div>
    );

  const renderForm = (
    <>
      {" "}
      <div className="Logform-container">
        <form onSubmit={handleSubmit} className="Logform">
          <div className="Logform-content">
            <h3 className="Logform-title">Masuk</h3>
            <div className="click-button">
              <div className="row">
                <div className="col-md-3">
                  <a href="">Login</a>
                </div>
                <div className="col-md-6">
                  <a href="RegisterAdmin">Daftar</a>
                </div>
              </div>
            </div>

            <div class="form-group mt-3">
              <label>Username</label>

              <input
                type="text"
                name="uname"
                required
                className="form-control mt-1"
              />
              {renderErrorMessage("uname")}
            </div>
            <div class="form-group mt-3">
              <div className="inputbutton">
                <label>Sandi</label>
                <input
                  type="password"
                  name="pass"
                  required
                  className="form-control mt-1"
                />
                {renderErrorMessage("pass")}
              </div>
            </div>

            <br></br>

            <div className="row">
              <div className="col-md-6">
                <a href="#">Lupa sandi?</a>
              </div>
            </div>
            <div class="d-grid gap-2 mt-3">
              <button
                color="red"
                appearance="primary"
                type="submit"
                class="btn btn-secondary"
              >
                Masuk 
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  return <div className="app">{isSubmitted ? <div></div> : renderForm}</div>;
};

export default Logincomp;
