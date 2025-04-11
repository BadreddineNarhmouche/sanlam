import { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '../MenuItem/MenuItem';

const DropdownComponent = (props: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        label={props.label}
        IconComponent={KeyboardArrowDownIcon}
      >
        {props.options?.map(
          (option: { label: string; value: string }, index: number) => {
            return (
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>
            );
          },
        )}
      </Select>
    </FormControl>
  );
};

export default memo(DropdownComponent);
