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

import { IProfile, listProfiles } from '../../../../../../integrations/authApi/profiles';
import { createUser } from '../../../../../../integrations/authApi/users';
import MultiSelect from '../../../../../components/MultiSelect';


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
    setOpen: (open: boolean) => void}

export default function (props: IProps) {
    const [profiles, setProfiles] = useState<IProfile[]>([])
    const [profilesSelect, setProfilesSelected] = useState<string[]>([])
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordlError] = useState(false)
    const [confirmPassowordError, setConfirmPasswordError] = useState(false)
    const [profilesError, setProfilesError] = useState(false)
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')


    const { open, setOpen } = props;

    const renderAlert = (type: AlertType, text: string) => {
        setTextAlert(text);
        setAlertType(type);
        setDisplayAlert('block');
    } 

    const validateFields = ()=>{
        let isValid = true
        const emailRegex = /\S+@\S+\.\S+/
        if (!!!email){
            setEmailError(true);
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError(true);
            renderAlert('error', 'Digite um email valido');
            isValid = false;
        }
        else setEmailError(false);
        
        if (!!!password){
            setPasswordlError(true)
            isValid = false;
        }
        else setPasswordlError(false);
        if(!!!confirmPassword){
            setConfirmPasswordError(true);
            isValid = false;
        }
        else setConfirmPasswordError(false)
        if(profilesSelect.length === 0){
            setProfilesError(true);
            renderAlert('error', 'Deve ser selecionado pelo menos um perfil');
            isValid = false;
        }
        else setProfilesError(false)
        return isValid
    }

    const validatePassword = ()=>{
        if(password !== confirmPassword){
            renderAlert('error', 'A senha e a confirmação de senha devem ser iguais')
            setConfirmPasswordError(true);
            setPasswordlError(true);
            return false
        }
        else if (password.length < 8){
            renderAlert('error', 'A senha deve ter no minimo 8 digitos')
            setConfirmPasswordError(true);
            setPasswordlError(true);
            return false
        }
        return true
    }

    const validate = ()=>{
        if(!validateFields()) return false
        if(!validatePassword()) return false
        return true
    }

    const save = async ()=>{
        if(!validate()) return
        try{
            const response = await createUser({
                email, password, profiles:profilesSelect
            })
            if(response.status === 201){
                renderAlert('success', 'Usuario Cadastrado com sucesso');
            }
        }catch(error: unknown){
            if(axios.isAxiosError(error)){
                if(error.response && error.response.status === 409){
                    renderAlert('error', 'Este email ja esta cadastrado para outro usuario');
                    setEmailError(true);
                }
                else if(error.response && error.response.status === 403){
                    renderAlert('error', 'Voce não tem permissão para criar este usuario');
                    setEmailError(true);
                }
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleListProfiles = async ()=>{
        const list = await listProfiles()
        setProfiles(list)
    }

    useEffect(()=>{
        handleListProfiles()
    }, [])

    useEffect(()=>{
        if(emailError || passwordError || confirmPassowordError || profilesError){
            if(validate()){
                setDisplayAlert('none')
            }
        }
        else {
            setDisplayAlert('none')
        }
    }, [email, password, confirmPassword, profilesSelect])


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
                            Cadastrar  novo usuario
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} display={displayAlert}>
                                    <Alert severity={alertType}>{textAlert}</Alert>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={emailError}
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event)=>setEmail(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={passwordError}
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(event)=>setPassword(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={confirmPassowordError}
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirme sua senha"
                                        type="password"
                                        id="confirm-password"
                                        value={confirmPassword}
                                        onChange={(event)=>setConfirmPassword(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MultiSelect 
                                        nameSelect='Perfis'
                                        setValuesSelecteds={setProfilesSelected}
                                        valuesSelecteds={profilesSelect}
                                        error={profilesError}
                                        options={profiles.map((item)=>{
                                            return {
                                                name: item.name,
                                                value: item.id
                                            }
                                        })}
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