import React, { useState, useEffect, CSSProperties } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


type OptionsType = {
  value: number | string;
  name: string;
}

interface IProps {
  nameSelect: string;
  options: OptionsType[];
  setValuesSelecteds: (value: any)=>void;
  valuesSelecteds: string[];
  styles?: CSSProperties;
  error?: boolean;
  checkboxDisabled?: boolean;
  
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultiSelect(props: IProps) {

  const {nameSelect, options, setValuesSelecteds, valuesSelecteds, checkboxDisabled} = props;
  const styles = props.styles || {}

  const handleChange = (event: SelectChangeEvent<typeof valuesSelecteds>) => {
    const {
      target: { value },
    } = event;
    setValuesSelecteds(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <div>
      
        <InputLabel id={`multiple-checkbox-${nameSelect}-label`}>{nameSelect}</InputLabel>
        <Select
          labelId={`multiple-checkbox-${nameSelect}-label`}
          id={`multiple-checkbox-${nameSelect}`}
          multiple
          fullWidth
          value={valuesSelecteds}
          onChange={handleChange}
          input={<OutlinedInput label="Perfis" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{ ...styles}}
          error={props.error}
        >
          {options.map((item) => (
            <MenuItem key={`${item.value}-${item.name}`} value={item.name} disabled={checkboxDisabled}>
              <Checkbox disabled={checkboxDisabled} checked={valuesSelecteds.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      
    </div>
  );
}
