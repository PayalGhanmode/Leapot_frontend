import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './style.css';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(prev => !prev); 
    setShowModal(false); 
  };

  return (
    <div className="user-management-container">
      <button className="user-btn" onClick={() => setShowModal(true)}>
        Add User
      </button>

      <UserTable refresh={refresh} />

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <UserForm onUserAdded={handleUserAdded} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
