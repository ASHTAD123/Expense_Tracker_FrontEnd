import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(null);

    useEffect(()=>{
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus==='true');     
    },[])

    if(isAuthenticated === null){
          // Show loading until the authentication status is determined
        return<div>Loading...</div>
    }

     // Redirect to login if not authenticated
    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }

      // If authenticated, render child routes
     return <Outlet />;
}

export default ProtectedRoute