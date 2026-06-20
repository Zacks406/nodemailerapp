import React from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
//check for logged in user
import isLogin from '../helpers/isLogin'

const PrivateRoute = ({ Component, user }) => {
    const location = useLocation()
   if(isLogin() === null){
    return <Navigate to='/login' state={{from : location }} replace />
   }
   return <Component />
}
const mapStateToProp = (state) =>{
    const {user} =state;
    return {user}
}
export default connect(mapStateToProp)(PrivateRoute)