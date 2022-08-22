import React, { CSSProperties, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface IOptions {
    value: string | number | boolean;
    text: string;
}

interface IProps {
  label: string;
  value: string;
  options: IOptions[];
  onChange: (value: string) => void;
  styles?: CSSProperties;
}

export default function BasicSelect(props: IProps) {
    const [value, setValue] = useState(props.value)

    const { label, styles, options, onChange } = props;
    
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
        setValue(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={`${label}-select`}
                value={value}
                label={label}
                onChange={handleChange}
                style={{...styles}}
            >
                {options.map((option)=> (
                    <MenuItem key={option.value.toString()} value={option.value.toString()}>{option.text}</MenuItem>)
                )}
            </Select>
        </FormControl>
        </Box>
    );
}
