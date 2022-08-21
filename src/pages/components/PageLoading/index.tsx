import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


interface IProps {
    open: boolean;
}


export default function PageLoading(props: IProps){
    const { open } = props;
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}