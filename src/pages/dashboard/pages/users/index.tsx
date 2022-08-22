import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import {
  listUsers,
  IUser,
  updateUser,
  IUsersFilters
} from "../../../../integrations/authApi/users";
import {
    listProfiles, IProfile
  } from "../../../../integrations/authApi/profiles";
import NavBar from "./components/NavBar";
import Table from "../../../components/Table";
import ModalEdit from "./components/ModalEditUser";
import ModalCreate from "./components/ModalCreateUser";
import { hasRole } from "../../../../utils/security";
import PageLoading from "../../../components/PageLoading";
import Select from "../../../components/Select";
import InputSearch from "../../../components/InputSearch";
import Filters from './components/Filters';

interface IProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export default function Users(props: IProps) {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [users, setusers] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser>();
  const [isLoading, setIsloading] = useState(false);
  const [filters, setFilters] = useState<IUsersFilters>({})
  const [profiles, setProfiles] = useState<IProfile[]>([])

  const { drawerWidth, handleDrawerToggle } = props;

  const handleModalEditOpen = (user: IUser) => {
    setModalEditOpen(!modalEditOpen);
    setUserSelected(user);
  };

  const handleUpdateUserProfile = (user: IUser) => {
    const newUsers = users.map((item) => {
      if (item.id === user.id) {
        return { ...item, profiles: user.profiles };
      }
      return item;
    });
    setusers(newUsers);
  };

  const handleChangeFilters = (newFilters: IUsersFilters)=>{
    setFilters({...filters, ...newFilters})
  }

  const handleEnableUser = async (userId: number, enable: boolean) => {
    setIsloading(true);
    const newUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, enable: enable };
      }
      return user;
    });
    await updateUser(userId, { enable });
    setusers(newUsers);
    setIsloading(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "profiles", headerName: "Perfis", width: 200 },
    {
      field: "enable",
      headerName: "ativo",
      width: 120,
      renderCell: (params: GridValueGetterParams) => (
        <FormControlLabel
          control={<Switch checked={params.row.enable ? true : false} />}
          label={`${params.row.enable ? "Ativo" : "Inativo"}`}
          onClick={() => handleEnableUser(params.row.id, !params.row.enable)}
          disabled={!hasRole("UPDATE_USERS")}
        />
      ),
    },
    {
      field: "editar",
      renderCell: (params: GridValueGetterParams) => (
        <IconButton onClick={() => handleModalEditOpen(params.row)}>
          <ModeEditOutlineOutlinedIcon color="primary" />
        </IconButton>
      ),
    },
  ];

  const getUsers = async () => {
    setIsloading(true);
    const list = await listUsers(filters);
    setusers(list);
    setIsloading(false);
  };

  const getProfiles = async () => {
    setIsloading(true);
    const list = await listProfiles();
    setProfiles(list);
    setIsloading(false);
  };

  useEffect(() => {
    getUsers();
    getProfiles()
  }, []);

  useEffect(() => {
    getUsers();
  }, [filters]);

  return (
    <>
      <PageLoading open={isLoading} /> 
      <CssBaseline />
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
       <Box
        display={"flex"}
        style={{ 
          width: "100%", 
          flexWrap: "wrap", 
          maxWidth: "100vw", 
          alignItems: 'center', 
          justifyContent: 'space-between'
      }}
      >
        <Box sx={{ marginTop: "10px", marginRight: "20px" }}>
            <Button
                style={{ margin: "20px 0"}}
                variant="outlined"
                onClick={() => setModalCreateOpen(!modalCreateOpen)}
                disabled={!hasRole("CREATE_USERS")}
            >
                CRIAR USUARIO
            </Button>
        </Box>
        <Box sx={{ marginTop: "10px", marginRight: "20px" }}>
            <Filters 
              onChangeFilters={handleChangeFilters}
              profiles={profiles}
              filters={filters}
            />
        </Box>
      </Box>
      <Table data={users} columns={columns} pageSize={50}/>
      <ModalEdit
        open={modalEditOpen}
        setOpen={setModalEditOpen}
        user={userSelected}
        setUpdateUserProfiles={handleUpdateUserProfile}
      />
      <ModalCreate open={modalCreateOpen} setOpen={setModalCreateOpen} />
    </>
  );
}
