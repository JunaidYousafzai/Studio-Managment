import React, { useContext } from 'react'
import { Navigate,Outlet } from 'react-router'
import { useAuth } from '../context/AuthContextProvider';
const UserRoutes = () => {
    const {user } = useAuth();
  return (
    <>
       {user.token?<Outlet />:<Navigate to="/login"/>}
    </>
  )
}

export default UserRoutes
