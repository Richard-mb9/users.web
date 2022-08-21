import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { IProfile,  listProfiles } from '../../../../../../integrations/authApi/profiles';
import { IUser, updateUserProfiles } from '../../../../../../integrations/authApi/users';

import MultiSelect from '../../../../../components/MultiSelect';
import { hasRole } from '../../../../../../utils/security';


type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'block';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    padding: 2,
    borderRadius: 3,
};

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setUpdateUserProfiles: (user: IUser) => void;
    user?: IUser;
    
}

export default function (props: IProps) {
    const [profiles, setProfiles] = useState<IProfile[]>([])
    const [profilesSelected, setProfilesSelected] = useState<string[]>([])
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')
    const [profilesError, setProfilesError] = useState(false)

    const { open, setOpen, user, setUpdateUserProfiles } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleListProfiles = async ()=>{
        const list = await listProfiles()
        const listProfile = [...((user && user.profiles) || []).map((profile)=>profile)];
        setProfilesSelected(listProfile)
        setProfiles(list)
    }

    useEffect(()=>{
        handleListProfiles()
    }, [user])

    const renderAlert = (type: AlertType, text: string) => {
        setTextAlert(text);
        setAlertType(type);
        setDisplayAlert('block');
    }

    const validate = ()=>{
        let isValid = true;
        if(profilesSelected.length === 0){
            setProfilesError(true);
            renderAlert('error', 'Para Salvar as alterações deve ser selecionado pelo menos um perfil');
            isValid = false;
        }
        else setProfilesError(false);
        return isValid;
    }

    useEffect(()=>{
        if(profilesError){
            if(validate()){
                setDisplayAlert('none')
            }
        }
        else {
            setDisplayAlert('none');
        }
    }, [profilesSelected])

    const save = async ()=>{
        if (!validate()) return
        if(user){
            const response = await updateUserProfiles(user.id,{profiles: profilesSelected});
            if(response.status === 204){
                renderAlert('success', 'Usuario alterado com sucesso');
                setUpdateUserProfiles({...user, profiles: profilesSelected})
            }
        }
        
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth: '100vw'}}>
                    <Box sx={{marginBottom: 2}}>
                        <Typography sx={{ textAlign: 'center' }} variant='h6'>
                            {(user && user.email) || ''}
                        </Typography>
                    </Box>
                    <Box display={displayAlert}>
                        <Alert severity={alertType}>{textAlert}</Alert>
                    </Box> 
                    <Box >
                        <MultiSelect 
                            nameSelect='Perfis'
                            setValuesSelecteds={setProfilesSelected}
                            valuesSelecteds={profilesSelected}
                            options={profiles.map((item)=>{
                                return {
                                    name: item.name,
                                    value: item.id
                                }
                            })}
                            error={profilesError}
                            styles={{width: 300}}
                            checkboxDisabled={!hasRole('UPDATE_USERS')}
                        />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                        <Button
                            onClick={() => save()}
                            color={'success'}
                            sx={{ margin: 1 }} variant="outlined"
                            disabled={!hasRole('UPDATE_USERS')}
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