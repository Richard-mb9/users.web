import React, {useContext} from 'react';

import { AlertContext } from './alert';

export function useAlert(){
    const { openAlert } = useContext(AlertContext)
}