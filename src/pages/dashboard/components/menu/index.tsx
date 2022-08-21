import React from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';

import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

import LinkDashboardMenu from '../linkDashboardMenu';

interface Props {
    window?: () => Window;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

export default function (props: Props) {
    const navigate = useNavigate();
    const { window, mobileOpen, handleDrawerToggle, drawerWidth } = props;

    const container = window !== undefined ? () => window().document.body : undefined;
    
    const logOut = ()=>{
        localStorage.clear()
        navigate('/login')
    }

    const menu = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <LinkDashboardMenu to='/users' text='Usuarios' icon={<PersonIcon/>} />
                <LinkDashboardMenu to='/Profiles' text='Perfis de usuarios' icon={<GroupsIcon/>} />
                <LinkDashboardMenu to='/roles' text='Permissões' icon={<PrivacyTipIcon/>} />
            </List>
            <Divider />
            <List>
                <LinkDashboardMenu to='' onClick={()=>logOut()} isButton text='Sair' icon={<LogoutIcon/>} />
            </List>
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {menu}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {menu}
            </Drawer>
        </Box>
    )
}