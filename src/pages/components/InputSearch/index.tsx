import React, { CSSProperties, FormEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface IProps {
  value: string;
  styles?: CSSProperties;
  placeholder?: string;
  onSearch?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: ()=> void;
}


export default function CustomizedInputBase(props: IProps) {
  const { styles, placeholder, onChange, onSearch, onSelect, value } = props;

  const handleOnselect = (event: ChangeEvent<HTMLInputElement>) =>{
    if(onSelect){
      onSelect();
    }
  }

  const handleSearch = ()=> {
    if(onSearch){
      onSearch();
    }
  }
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, ...styles }}
      onSubmit={(e: FormEvent<HTMLFormElement>)=>{e.preventDefault(); handleSearch()}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || "Procurar"}
        inputProps={{ 'aria-label': 'Procurar' }}
        value={value}
        onChange={onChange}
        onSelect={handleOnselect}
      />
      <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
