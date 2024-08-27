import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const AuthTemplate = () => {
    const navigate=useNavigate();
    const {infoUser} = useSelector((state) => state.userReducer);
    useEffect(()=> {
    if(infoUser){
    navigate('/')
    }
    },[])
    return (
        <Outlet></Outlet>
    )
}

export default AuthTemplate