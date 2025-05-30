import { useContext } from 'react';
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const GuestRoute = () => {
    const {user} = useAuth()
    console.log(user)
  return (
    <>
      {!user.token ? <Outlet /> :<Navigate to="/" />}
    </>
  )
}

export default GuestRoute