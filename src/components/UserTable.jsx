import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../api';  // make sure updateUser is imported
import Swal from 'sweetalert2';
const UserTable = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  // For update editing
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '', group: '' });

  const fetchUsers = async () => {
    try {
      console.log('Searching with:', { search, groupFilter });
      const data = await getUsers(search, groupFilter);
      console.log('Users fetched:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
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
      console.error('Error deleting user:', error.message);
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
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      let res = await updateUser(editingUserId, editFormData);
      console.log("resssssssss",res);

      Swal.fire({
               icon: 'success',
        title: 'Success',
              text: res.message,
            });
      
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div>
      <h2>User List</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
          <option value="">All Groups</option>
          <option value="CSE">CSE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </div>

      <table border="1" cellPadding="5" cellSpacing="0">
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
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.group}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>{' '}
                    <button onClick={() => startEditing(user)}>Update</button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;