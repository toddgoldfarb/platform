import React from 'react';
import EditProfile from '../components/EditProfile.jsx';

const AdminUserPage = (props) => {
  return (
    <div className="ui admin events">
      <EditProfile {...props} />
    </div>
  );
};

export default AdminUserPage;
