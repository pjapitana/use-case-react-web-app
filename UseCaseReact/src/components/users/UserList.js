import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>First Name</th>
        <th>Last Name</th>
        <th>Birth Date</th>
        <th>Contact Number</th>
        <th>Active</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {users.map((user) => {
        return (
          <tr key={user.user_id}>
            <td>
              <Link to={"/user/" + user.user_id}>{user.title}</Link>
            </td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.birth_date}</td>
            <td>{user.contact_number}</td>
            <td>{user.is_active ? "true" : "false"}</td>
            <td>
              <Link
                to={"/user/" + user.user_id}
                className="btn btn-outline-primary"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(user)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default UserList;
