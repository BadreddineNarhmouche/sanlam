import React, { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Typography, TextField, Avatar, IconButton } from '../../atoms';
import {
  titleContainer,
  customNumberField,
  customAvatar,
  customIcon,
  customText,
} from './styles';

interface Props {
  id: string | number;
  title?: string;
  value: number;
  name: string;
  handleChange: any;
  onBlur: any;
  setFieldValue: any;
  currency?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  disabledAutoEditing?: boolean;
}

const NumberComponent: React.FC<Props> = ({
  id,
  title,
  name,
  value,
  handleChange,
  setFieldValue,
  currency,
  helperText,
  error,
  onBlur,
  disabled,
  disabledAutoEditing,
}) => {
  const theme = useTheme();

  const Increment = /* istanbul ignore next */ () => {
    setFieldValue(`${name}`, value ? value + 1 : 1);
  };

  const Decrement = /* istanbul ignore next */ () => {
    setFieldValue(`${name}`, value ? value - 1 : -1);
  };

  const formatNumber = (value: any) =>
    value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <Grid container flexDirection={'row'}>
      {title && (
        <Grid item xs={12} style={titleContainer}>
          <Typography variant="subtitle1" fontWeight={400}>
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item xs={6}>
        <TextField
          id={id}
          type="text"
          variant="standard"
          value={formatNumber(value)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const cleanedValue = event.target.value.replace(/[^0-9]/g, '');

            const numericValue =
              cleanedValue !== '' ? Number(cleanedValue) : null;

            const updatedEvent = {
              ...event,
              target: {
                ...event.target,
                id,
                value: numericValue,
              },
            };

            handleChange(updatedEvent);
          }}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          style={customNumberField(error)}
          InputProps={{
            style: customText(theme, error),
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={customText(theme, error)}>
                  {currency ? currency : ''}
                </Typography>
              </InputAdornment>
            ),
          }}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6} sx={{ textAlign: 'right' }}>
        {!disabled && !disabledAutoEditing && (
          <>
            <IconButton onClick={/* istanbul ignore next */ () => Decrement()}>
              <Avatar sx={customAvatar}>
                <RemoveIcon sx={customIcon} />
              </Avatar>
            </IconButton>
            <IconButton onClick={/* istanbul ignore next */ () => Increment()}>
              <Avatar sx={customAvatar}>
                <AddIcon sx={customIcon} />
              </Avatar>
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(NumberComponent);
