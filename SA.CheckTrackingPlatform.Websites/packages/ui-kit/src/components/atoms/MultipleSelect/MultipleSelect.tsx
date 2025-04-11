import React, { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const MultipleSelectComponent = (props: any) => {
  const theme = useTheme();
  const { value } = props;
  const handleChange = (_event: any, selectedItems: any) => {
    const duplicatedIds = selectedItems
      ?.filter((item: any, index: number, array: any[]) =>
        array.slice(index + 1).some((otherItem) => otherItem.id === item.id),
      )
      ?.map((item: any) => item.id);

    const updatedValue = selectedItems?.filter(
      (item: any) => !duplicatedIds.includes(item.id),
    );
    props.setFieldValue(props.name, updatedValue);
  };

  function getStyles(
    item: { id: number; code: string; label: string },
    selectedItems: readonly (typeof item)[],
    theme: any,
  ) {
    return {
      fontWeight: selectedItems.some(
        (selectedItem: any) => selectedItem.id === item.id,
      )
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
      backgroundColor: selectedItems.some(
        (selectedItem: any) => selectedItem.id === item.id,
      )
        ? theme.palette.primary.light
        : theme.palette.base.main,
    };
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <Autocomplete
          multiple
          id="demo-multiple-chip"
          options={props.options}
          noOptionsText={'Aucune valeur trouvée'}
          value={props.value}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} style={getStyles(option, value, theme)}>
              {option.label}
            </MenuItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={props.error}
              helperText={props.helperText}
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any, index: any) => (
              <Chip
                label={option.label}
                {...getTagProps({ index })}
                style={getStyles(option, props.value, theme)}
              />
            ))
          }
        />
      </FormControl>
    </div>
  );
};

export default memo(MultipleSelectComponent);
