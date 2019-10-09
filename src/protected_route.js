import React from 'react';
import {Route , Redirect}  from "react-router-dom"
import Auth from './Auth'

export const ProtectedRoute =({component: Component , ...rst})=>{
    return(

        <Route 
        {...rst}
        render ={ props=>{

            if (Auth.isAuthenticate()) {
                return <Component {...props} />       
            }else{
                return <Redirect to="/"  />
            }
         
          
        }}
        />
    )
}