import React, {useContext} from 'react';
import { defaultDuaration, SnackbarContext } from './snackbar';

export function useSnackbar(){
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)

    const open = (message: string, duration=defaultDuaration) => {
        openSnackbar(message, duration)
    }

    return [open, closeSnackbar]
}