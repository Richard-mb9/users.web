import React from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

import Login from '../pages/login'
import Dashboard from '../pages/dashboard/pages';
import Home from '../pages/home';


export default function Index(){
    const createPrivateElement = (element: JSX.Element)=>{
        if(!!localStorage.getItem('access_token')){
            return element
        }
        else return <Navigate  to={"/login"}/>
    }

    return (
            <BrowserRouter>
                <Routes >
                    <Route element={<Login/>} path='/login' />
                    <Route element={createPrivateElement(<Dashboard/>)} path='/*'/>
                    <Route element={createPrivateElement(<Home/>)} path='/'/>
                </Routes>
            </BrowserRouter>
    )
}