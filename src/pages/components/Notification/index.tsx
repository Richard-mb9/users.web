import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


export interface IPropsNotification {
    open: boolean;
    setOpen: (value: boolean) => void;
    message: string;
}

const styles = {
    root: {
      background: 'red'
    }
  };

export default function (props: IPropsNotification){
    const { open, setOpen, message } = props;

    const handleClose = () => {
        setOpen(false);
      };
    

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={10000}
            ContentProps={{
                sx: {
                    backgroundColor: 'orangered'
                }
            }}
      />
    )
}