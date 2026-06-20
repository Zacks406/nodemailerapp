import React from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import isLogin from '../helpers/isLogin'

const PublicRoute = ({ Component, user }) => {
    const location = useLocation()
    if(user.data || isLogin()){
       return  <Navigate to='/' state={{from : location }} replace />
    }
    return <Component />
}

const mapStateToProp = (state) =>{
    const { user } = state;
    return {user}
}

export default connect(mapStateToProp)(PublicRoute)