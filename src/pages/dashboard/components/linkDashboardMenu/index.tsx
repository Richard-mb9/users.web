import React, {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';


const linkStyle: CSSProperties = {
    textDecoration: 'none', 
    color: '#222'
}

const buttonStyle: CSSProperties = {
    textDecoration: 'none', 
    color: '#222',
    width: '100%',
    borderRadius: 0,
    padding: 0,
    margin: 0
}

interface ILinkMenuProps {
    text: string;
    to: string;
    icon: JSX.Element;
    isButton?: boolean;
    onClick?: any;
}

export default function (props: ILinkMenuProps){
    return !props.isButton ? (
        <Link to={props.to} style={linkStyle} >
            <ListItem key={props.text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
        </Link>
    ) : (
        <IconButton style={buttonStyle} onClick={props.onClick || (()=>{})}>
            <ListItem key={props.text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
        </IconButton>
    )
}