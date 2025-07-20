import React from 'react';
import ANavbar from './ANavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div>
    <ANavbar />         
    <div className="p-4">
      <Outlet />        
    </div>
  </div>
);

export default AdminLayout;
