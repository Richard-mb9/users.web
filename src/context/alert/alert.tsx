import React, { createContext, useState, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

type AlertType = 'error' | 'warning' | 'info' | 'success';

const defaultValue = {
    openAlert: (message: string, type: AlertType) => {}
}

export const AlertContext = createContext(defaultValue);


export default function ({children}: PropsWithChildren){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [type, setType] = useState<AlertType>('error')

    const openAlert = (message: string, type: AlertType) => {
        setOpen(true);
        setMessage(message)
        setType(type)
    }
    
    return (
        <AlertContext.Provider value={{openAlert}}>
            <Box display={open ? 'block' : 'none'}>
                <Alert severity={type}>{message}</Alert>
            </Box>
        </AlertContext.Provider>
    )

} 
