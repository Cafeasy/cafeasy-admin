import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Createcrud() {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const navigation = useNavigate();
  // const handleSubmit=(e)=>{
  // e.preventDefault();
  // const empdata = {id,name,email,phone}

  //     fetch('http://localhost:3000/cruddata',{
  //     method:"POST",
  //     headers:{"content-type":"application/json"},
  //     body:JSON.stringify(empdata)
  //     }).then((res)=>{
  //     return res.json();
  //     })
  //     .then((res)=>{
  //         alert('Record inserted');
  //         navigation('/');
  //     }).catch((err)=>{
  //         console.log(err);
  //     })
  //    }
  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="card">
            <div className="card-title">
              <h2>React Js Crud Tutorial</h2>
            </div>
            <div className="card-body">
              <div className="offset-lg-3 col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="row" style={{ textAlign: "left" }}>
                    <div className="container">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => namechange(e.target.value)}
                            className="form-control"
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div
                          className="form-group"
                          style={{ textAlign: "center" }}
                        >
                          <button type="submit" className="btn btn-success m-2">
                            Submit
                          </button>
                          <Link to="/" className="btn btn-danger">
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
