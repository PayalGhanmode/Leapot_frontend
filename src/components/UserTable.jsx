import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getUsers, deleteUser, updateUser } from "../api";
import "./style.css";

const UserTable = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    group: "",
  });

  const fetchUsers = async () => {
    try {
      const data = await getUsers(search, groupFilter);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, groupFilter, refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      group: user.group,
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
  };

  const handleEditChange = (e) => {
    setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await updateUser(editingUserId, editFormData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message || "User updated successfully",
      });

      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update user",
      });
    }
  };

  return (
    <div className="user-table-container">

      <div
        className="filters"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Groups</option>
          <option value="CSE">CSE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) =>
              editingUserId === user._id ? (
                <tr key={user._id}>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="group"
                      value={editFormData.group}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button className="action-btn save" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="action-btn cancel"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.group}</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => startEditing(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(user._id);
                            Swal.fire(
                              "Deleted!",
                              "User has been deleted.",
                              "success"
                            );
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5" className="no-users">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
