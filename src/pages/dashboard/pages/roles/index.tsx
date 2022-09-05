import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import {listRoles, IRole} from '../../../../integrations/authApi/roles';
import NavBar from '../../../components/NavBar';
import Table from '../../../components/Table';
import ModalCreateRole from './components/ModalCreateRole';
import ModalEditRole from './components/ModalEditRole';
import { hasRole } from '../../../../utils/security';
import PageLoading from '../../../components/PageLoading';
import { useSnackbar } from '../../../../context/notification/useSnackbar';
import axios from 'axios';


interface IProps {
    drawerWidth: number;
    handleDrawerToggle: ()=>void;
}

export default function Roles(props: IProps){
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [roleSelected, setRoleSelected] = useState<IRole>();
    const [isLoading, setIsloading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    
    const [openSnackbar] = useSnackbar();

    const {drawerWidth, handleDrawerToggle} = props;

    const handleModalEditOpen = (role: IRole) =>{
        setModalEditOpen(!modalEditOpen)
        setRoleSelected(role)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'name', headerName: 'Nome', width: 150,
            renderCell: (params: GridValueGetterParams) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'edit',
            renderCell: (params: GridValueGetterParams) => (
                <IconButton onClick={()=>handleModalEditOpen(params.row)}>
                    <ModeEditOutlineOutlinedIcon color='primary'/>
                </IconButton>
            ),
        }
    ];

    const getRoles = async ()=>{
        setIsloading(true);
        try{
            const list = valueSearch ? await listRoles({name: valueSearch}) : await listRoles();
            setRoles(list.data || [])
        }
        catch (error: unknown){
            if(axios.isAxiosError(error)){
                if(error.response && error.response.status === 403){
                    openSnackbar('Você não tem permissão para listar permissões!')
                    setRoles([])
                }
            }
        }
        setIsloading(false)
    }

    const onSearch = ()=>{
        getRoles()
    }

    useEffect( ()=>{
        getRoles()
    }, [])

    return (
        <>
            <PageLoading  open={isLoading}/>
            <CssBaseline />
            <NavBar 
                drawerWidth={drawerWidth} 
                handleDrawerToggle={handleDrawerToggle} 
                valueSearch={valueSearch}
                handleChangeValueSearch={(event)=>setValueSearch(event.target.value)}
                onSearch={onSearch}
            />
            <Button 
                style={{marginBottom: 20}} 
                variant="outlined"
                onClick={()=>setModalCreateOpen(!modalCreateOpen)}
                disabled={!hasRole('CREATE_ROLES')}
            >
                CRIAR NOVA PERMISSÃO
            </Button>
            <Table data={roles} columns={columns} pageSize={20}/>
            <ModalCreateRole 
                open={modalCreateOpen}
                setOpen={setModalCreateOpen}
                roles={roles}
                setRoles={setRoles}
            />
            <ModalEditRole
                open={modalEditOpen}
                setOpen={setModalEditOpen}
                roles={roles}
                setRoles={setRoles}
                roleSelected={roleSelected}
            />
        </>
        
    )
}