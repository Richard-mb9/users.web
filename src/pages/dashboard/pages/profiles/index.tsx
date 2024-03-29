import React, { useState, useEffect, ChangeEvent } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import {listProfiles, IProfile} from '../../../../integrations/authApi/profiles';
import NavBar from '../../../components/NavBar';
import Table from '../../../components/Table';
import ModalCreateProfile from './components/ModalCreateProfile';
import ModalEditProfile from './components/ModalEditProfile';
import { hasRole } from '../../../../utils/security';
import PageLoading from '../../../components/PageLoading';


interface IProps {
    drawerWidth: number;
    handleDrawerToggle: ()=>void;
}


export default function Profiles(props: IProps){
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [profileSelected, setProfileSelected] = useState<IProfile>();
    const [isLoading, setIsloading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');

    const {drawerWidth, handleDrawerToggle} = props;


    const handleModalEditOpen = (profile: IProfile)=>{
        setModalEditOpen(!modalEditOpen)
        setProfileSelected(profile)
    }

    const handleUpdateProfile = (profile: IProfile) =>{
        const newProfiles = profiles.map((item)=>{
            if(item.id === profile.id){
                return profile;
            }
            return item;
        })
        setProfiles(newProfiles);
    }

    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 150 },
        {
            field: 'Editar',
            width: 70,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <IconButton onClick={()=>handleModalEditOpen(params.row)}>
                        <ModeEditOutlineOutlinedIcon color='primary'/>
                    </IconButton>
                </div>
            ),
        }
    ];

    const getProfiles = async ()=>{
        setIsloading(true);
        const list = valueSearch ? await listProfiles({name: valueSearch}) : await listProfiles();
        setProfiles(list);
        setIsloading(false)
    }

    const onSearch = ()=>{
        getProfiles()
    }

    useEffect( ()=>{
        getProfiles()
    }, [])

    return (
        <>
            <PageLoading open={isLoading}/>
            <CssBaseline />
            <NavBar 
                drawerWidth={drawerWidth} 
                handleDrawerToggle={handleDrawerToggle} 
                valueSearch={valueSearch}
                handleChangeValueSearch={(event)=> setValueSearch(event.target.value)}
                onSearch={onSearch}
            />
            <Button 
                style={{marginBottom: 20}} 
                variant="outlined"
                onClick={()=>setModalCreateOpen(!modalCreateOpen)}
                disabled={!hasRole('CREATE_PROFILES')}
            >
                CRIAR NOVO PERFIL
            </Button>
            <Table data={profiles} columns={columns} pageSize={20}/>
            <ModalEditProfile 
                open={modalEditOpen} 
                setOpen={setModalEditOpen} 
                setUpdatedProfile={handleUpdateProfile} 
                profile={profileSelected}
            />
            <ModalCreateProfile  
                open={modalCreateOpen} 
                setOpen={setModalCreateOpen}
                setProfiles={setProfiles}
                profiles={profiles}
            
            />
        </>
        
    )
}