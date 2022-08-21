import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import { IRole } from '../../../../../../integrations/authApi/roles';


interface IProps {
  selectedIdRoles: number[];
  setSelectedRoles: (values: number[]) => void;
  allRoles: IRole[];
  chekboxDisabled?: boolean;
}

export default function CheckboxList(props: IProps) {
  const { allRoles, selectedIdRoles, setSelectedRoles, chekboxDisabled} = props;

  const [checked, setChecked] = React.useState(selectedIdRoles);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setSelectedRoles(newChecked);
  };


  useEffect(()=>{
    setChecked(selectedIdRoles)
  }, [selectedIdRoles])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 300,overflowY: 'scroll' }}>
      {allRoles.map((role) => {
        const labelId = `checkbox-list-label-${role.id}`;

        return (
          <ListItem
            key={role.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(role.id)} dense disabled={chekboxDisabled}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(role.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  disabled={chekboxDisabled}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${role.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
