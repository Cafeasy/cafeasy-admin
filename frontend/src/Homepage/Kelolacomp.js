import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Kelolacomp = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(process.env.REACT_APP_API_URL);
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(process.env.REACT_APP_API_URL$);
    loadUsers();
  };

  return (
    <div className="container">
    <div className="py-4">
      <br></br>
      <div className="title-crud"> DESKRIPSI MENU </div>
      <br></br> <br></br>
      <div class="table-title">
					<div class="row">
						<div class="col-xs-7">
							<h4> <b>Inventory</b></h4>
						</div>
						<div class="col-xs-2">
							<a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
							<a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Delete</span></a>						
						</div>
					</div>
				</div>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name Menu</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
              <Link
                  class="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user.id}`}
                >
                  Edit
                </Link>
                <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default Kelolacomp;