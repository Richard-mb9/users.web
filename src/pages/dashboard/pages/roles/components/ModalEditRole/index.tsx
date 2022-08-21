import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import { IRole, updateRole } from '../../../../../../integrations/authApi/roles';
import MultiSelect from '../../../../../components/MultiSelect';
import { hasRole } from '../../../../../../utils/security';


type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'block';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
};

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    roles: IRole[];
    setRoles: (roles: IRole[]) => void;
    roleSelected?: IRole;
}

export default function (props: IProps) {
    const { open, setOpen, roles, setRoles, roleSelected } = props;

    const [name, setName] = useState<string>((roleSelected && roleSelected.name) || '')
    const [nameError, setNameError] = useState(false)
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')

    const renderAlert = (type: AlertType, text: string) => {
        setTextAlert(text);
        setAlertType(type);
        setDisplayAlert('block');
    } 

    const validateFields = ()=>{
        let isValid = true
        if (!!!name){
            setNameError(true);
            isValid = false;
        }
        else setNameError(false);
        return isValid
    }

    const validate = ()=>{
        if(!validateFields()) return false
        return true
    }

    const handleListRoles = ()=>{
        const newRoles = roles.map((role)=> {
            if(roleSelected && role.id === roleSelected.id){
                return {...role, name}
            }
            return role
        })
        setRoles(newRoles)
    }

    const save = async ()=>{
        if(!validate()) return
        try{
            if(!roleSelected) return
            const response = await updateRole(roleSelected.id ,{name})
            if(response.status === 204){
                renderAlert('success', 'Permissão Cadastrado com sucesso');
                handleListRoles()
            } 
        }catch(error: unknown){
            if(axios.isAxiosError(error)){
                if(error.response && error.response.status === 409){
                    renderAlert('error', 'ja existe uma permissão com este nome');
                    setNameError(true);
                }
                else if(error.response && error.response.status === 403){
                    renderAlert('error', 'Voce não tem permissão para criar Permissões');
                    setNameError(true);
                }
            }
        }
    }

    const handleClose = () => {
        setName('')
        setOpen(false);
    };

    useEffect(()=>{
        if(nameError){
            if(validate()){
                setDisplayAlert('none')
            }
        }
        else {
            setDisplayAlert('none')
        }
    }, [name])

    useEffect(()=>{
        if(roleSelected){
            setName(roleSelected.name)
        }
    }, [roleSelected])


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth:  'calc(100vw - 20px)'}}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Editar Permissão
                        </Typography>
                        <Box sx={{ mt: 3 }} style={{width: '100%'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} display={displayAlert}>
                                    <Alert severity={alertType}>{textAlert}</Alert>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={nameError}
                                        fullWidth
                                        id="name"
                                        label="Nome da Permissão"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(event)=>setName(event.target.value)}
                                        disabled={!hasRole('UPDATE_PROFILES')}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                        <Button
                            onClick={() => save()}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                            disabled={!hasRole('UPDATE_PROFILES')}
                        >
                            SALVAR
                        </Button>
                        <Button
                            onClick={() => handleClose()}
                            color={'error'}
                            sx={{ margin: 1 }} variant="outlined"
                        >
                            SAIR
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}