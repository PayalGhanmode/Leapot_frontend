import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(!refresh); 
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onUserAdded={handleUserAdded} />
      <UserTable refresh={refresh} />
    </div>
  );
}

export default App;
