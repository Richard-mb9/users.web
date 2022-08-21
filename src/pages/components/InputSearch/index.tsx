import React, { CSSProperties, useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface IProps {
  value: string;
  styles?: CSSProperties;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onSelect?: ()=> void;
}


export default function CustomizedInputBase(props: IProps) {
  const [value, setValue] = useState(props.value)

  const { styles, placeholder, onChange, onSearch, onSelect } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
    if(onChange){
      onChange(event.target.value);
    }
    setValue(event.target.value);
    
  }

  const handleOnselect = (event: ChangeEvent<HTMLInputElement>) =>{
    if(onSelect){
      onSelect();
    }
  }

  const handleSearch = ()=> {
    if(onSearch){
      onSearch(value);
    }
  }
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, ...styles }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || "Procurar"}
        inputProps={{ 'aria-label': 'Procurar' }}
        value={value}
        onChange={handleChange}
        onSelect={handleOnselect}
      />
      <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
