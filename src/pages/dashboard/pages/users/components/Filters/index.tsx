import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Select from "../../../../../components/Select";
import { IUsersFilters } from "../../../../../../integrations/authApi/users";
import { IProfile } from "../../../../../../integrations/authApi/profiles";

interface IProps {
  onChangeFilters: (filters: IUsersFilters) => void;
  profiles: IProfile[];
  filters: IUsersFilters;
}

export default function SwipeableTemporaryDrawer(props: IProps) {
  const { profiles, onChangeFilters, filters } = props;

  const [open, setOpen] = useState(false);
  const [valuesFilters, setValueFilters] = useState<IUsersFilters>(filters)

  const search = ()=>{
    onChangeFilters(valuesFilters)
    setOpen(false);
  }

  const handleKeyPress = (key: string)=> {
    if(key === 'Enter'){
      search()
    }
  }

  return (
    <div>
      <IconButton 
        onClick={()=>setOpen(true)}
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
        onClose={()=>setOpen(false)}
        onOpen={()=>{setOpen(true)}}
      >
        <Box role="presentation">
          <List>
            <Divider style={{marginTop: 60}}/>
            <ListItem>
              <Select
                value={valuesFilters.profile || ""}
                label="Profiles"
                styles={{ width: 250 }}
                options={[
                  { value: "all", text: "TODOS" },
                  ...profiles.map((profile) => ({
                    value: profile.name,
                    text: profile.name,
                  })),
                ]}
                onChange={(value) => setValueFilters({ ...valuesFilters, profile: value })}
              />
            </ListItem>
            <ListItem>
              <Select
                value={valuesFilters.enable || ""}
                label="Estado"
                styles={{ width: 250 }}
                options={[
                  { value: "all", text: "Todos" },
                  { value: true, text: "Ativos" },
                  { value: false, text: "Inativos" },
                ]}
                onChange={(value) => setValueFilters({ ...valuesFilters, enable: value })}
              />
            </ListItem>
            <ListItem>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  value={valuesFilters.email || ''}
                  id="email"
                  label="Email"
                  name="email"
                  style={{width: 250}}
                  onChange={(event) => setValueFilters({ ...valuesFilters, email: event.target.value })}
                  onKeyDown={(event)=>handleKeyPress(event.key)}
              />
            </Grid>
            </ListItem>
            <ListItem>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  value={valuesFilters.id || ''}
                  id="id-usuario-imput"
                  label="ID do Usuario"
                  name="id"
                  style={{width: 250}}
                  onChange={(event) => setValueFilters({ ...valuesFilters, id: event.target.value })}
                  onKeyDown={(event)=>handleKeyPress(event.key)}
              />
            </Grid>
            </ListItem>
            <Divider style={{marginTop: 10}}/>
            <ListItem>
              <Button 
                variant="outlined"
                style={{margin: '10px 0'}}
                onClick={search}
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
