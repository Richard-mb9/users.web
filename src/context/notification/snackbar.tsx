import React, { createContext, useState, PropsWithChildren } from 'react';
import Snackbar from '@mui/material/Snackbar';

const defaultValueContext = {
    openSnackbar: (message: string, duration: number) => {},
    closeSnackbar: () => {}
}

export const defaultDuaration = 10000;

export const SnackbarContext = createContext(defaultValueContext);

export default function ({children}: PropsWithChildren){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [duration, setDuration] = useState(defaultDuaration)

    const triggerSnackbar = (message: string, duration=defaultDuaration) => {
        setMessage(message)
        setDuration(duration)
        setOpen(true)
      }

    const openSnackbar = (message: string, duration=defaultDuaration) => {
        if (open === true) {
          setOpen(false)
        } else {
          triggerSnackbar(message, duration)
        }
      }

    const closeSnackbar = () => {
        setOpen(false)
      }
    
    return (
        <SnackbarContext.Provider value={{openSnackbar, closeSnackbar}}>
            {children}
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={closeSnackbar}
            message={message}
            autoHideDuration={duration}
            ContentProps={{
                sx: {
                    backgroundColor: 'orangered'
                }
            }}
      />
        </SnackbarContext.Provider>
    )

} 
