import React, { PropsWithChildren } from 'react';


import SnackbarContextProvider from './notification/snackbar';


export function GlobalContext({children}: PropsWithChildren){
    return (
        <SnackbarContextProvider>{children}</SnackbarContextProvider>
    )
}