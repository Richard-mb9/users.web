import React, { useState, useEffect, ChangeEvent } from 'react';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

import { createProfile, IProfile } from '../../../../../../integrations/authApi/profiles';


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
    profiles: IProfile[];
    setProfiles: (profiles: IProfile[]) => void;
}

export default function (props: IProps) {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState(false)
    const [createPermission, setCreatePermission] = useState(false)
    const [roleName, setRoleName] = useState<string | undefined>()
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')
    
    const { open, setOpen, profiles, setProfiles } = props;
    const defaultPrefixRoleName = "CREATE_USER_WITH_PROFILE";


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

    const handleInputProfileName = (event: ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value)
        if(createPermission){
            setRoleName(`${defaultPrefixRoleName}_${event.target.value}`.toUpperCase())
        }
    }

    const handleListProfiles = (id_profile: number)=>{
        const newProfiles = [...profiles, {id: id_profile, name}]
        setProfiles(newProfiles)
    }

    const save = async ()=>{
        if(!validateFields()) return
        try{
            const response = await createProfile({profileName: name, roleName})
            if(response.status === 201){
                renderAlert('success', 'Perfil Cadastrado com sucesso');
                handleListProfiles(response.data.id)
            } 
        }catch(error: unknown){
            if(axios.isAxiosError(error)){
                if(error.response && error.response.status === 409){
                    renderAlert('error', 'ja existe um perfil com este nome');
                    setNameError(true);
                }
                else if(error.response && error.response.status === 403){
                    renderAlert('error', 'Voce não tem permissão para criar Perfis de usuario');
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
            if(validateFields()){
                setDisplayAlert('none')
            }
        }
        else {
            setDisplayAlert('none')
        }
    }, [name])

    useEffect(()=>{
        if(!createPermission){
            setRoleName(undefined);
        }
        else {
            setRoleName(`${defaultPrefixRoleName}_${name}`.toUpperCase())
        }
    }, [createPermission])


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
                            Cadastrar  novo Perfil de Usuario
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
                                        label="Nome do Perfil"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={handleInputProfileName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Checkbox defaultChecked  checked={createPermission} onChange={()=>setCreatePermission(!createPermission)}/>} label="Sera necessario permissão especial para criar usuarios com este perfil" />
                                    {
                                        createPermission && (<>
                                            <Typography component="h6" sx={{marginTop: "20px"}}>
                                                Será criada a seguinte permissão
                                            </Typography>
                                            <Typography component="h1" variant="overline" sx={{textAlign: "center", marginTop: "10px"}}>
                                                {roleName}
                                            </Typography>
                                        </>)
                                    }
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