import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import InputSearch from "../../../../../components/InputSearch";
import Select from "../../../../../components/Select";
import { IUsersFilters } from "../../../../../../integrations/authApi/users";
import { IProfile } from "../../../../../../integrations/authApi/profiles";

interface IProps {
  onChangeFilters: (filters: IUsersFilters) => void;
  profiles: IProfile[];
  filters: IUsersFilters;
}

export default function SwipeableTemporaryDrawer(props: IProps) {
  const [open, setOpen] = useState(true);
  const { profiles, onChangeFilters, filters } = props;

  const toggleDrawer = (opened: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setOpen(opened);
  };

  const handleChange = (newFilters: IUsersFilters) => {
    onChangeFilters(newFilters);
    setOpen(false);
  };

  return (
    <div>
      <IconButton 
        onClick={toggleDrawer(true)}
        color="primary"
        style={{border: 'solid 1px', borderRadius: 2}}
        size={'small'}
      >
        <FilterAltIcon fontSize="medium"/>
        <span>Filtrar</span>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box role="presentation">
          <List>
            <ListItem>
              <Select
                value={filters.profiles || ""}
                label="Profiles"
                styles={{ width: 250 }}
                options={[
                  { value: "all", text: "TODOS" },
                  ...profiles.map((profile) => ({
                    value: profile.name,
                    text: profile.name,
                  })),
                ]}
                onChange={(value) => handleChange({ profiles: value })}
              />
            </ListItem>
            <ListItem>
              <Select
                value={filters.enable || ""}
                label="Estado"
                styles={{ width: 250 }}
                options={[
                  { value: "all", text: "Todos" },
                  { value: true, text: "Ativos" },
                  { value: false, text: "Inativos" },
                ]}
                onChange={(value) => handleChange({ enable: value })}
              />
            </ListItem>
            <ListItem>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  style={{width: 250}}
              />
            </Grid>
            </ListItem>
            <ListItem>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  id="id-usuario-imput"
                  label="ID do Usuario"
                  name="id"
                  style={{width: 250}}
              />
            </Grid>
            </ListItem>
            <Divider style={{marginTop: 10}}/>
            <ListItem>
              <Button 
                variant="outlined"
                style={{margin: '10px 0'}}
              >
                Buscar
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
