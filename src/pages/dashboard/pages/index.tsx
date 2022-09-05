import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Menu from '../components/menu';
import Users from './users';
import Profiles from './profiles';
import Roles from './roles';


export default function ResponsiveDrawer(props: any) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Menu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden'}}
            >
                <Routes>
                    <Route element={<Users drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}/>} path={`/users`}/>
                    <Route element={<Profiles drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}/>} path='/profiles'/>
                    <Route element={<Roles drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />} path='/roles'/>
                </Routes>
                
            </Box>
        </Box>
    );
}