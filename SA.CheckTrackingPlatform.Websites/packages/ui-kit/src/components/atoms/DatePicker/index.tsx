import DateRangeIcon from '@mui/icons-material/DateRange';
import { TextField } from '@mui/material';
import { fr } from 'date-fns/locale';
import { memo, useId } from 'react';
import { DateChangeCallBack, DatePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import styles from './styles';

const DatePickerComponent = (props: {
  date?: Date;
  label?: String;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  setDate: DateChangeCallBack;
  helperText?: String;
  error?: boolean;
  format?: string;
}) => {
  const id = useId();

  return (
    <DatePicker
      date={props.date}
      onDateChange={props.setDate}
      minimumDate={props.minimumDate}
      maximumDate={props.maximumDate}
      locale={fr}
      format={props.format || 'dd-MM-yyyy'}
    >
      {({ inputProps, focused }) => (
        <TextField
          disabled={props.disabled}
          InputProps={{
            endAdornment: <DateRangeIcon />,
          }}
          fullWidth
          className={'input' + (focused ? ' -focused' : '')}
          style={styles.dateInput}
          {...inputProps}
          id={'date-input-' + id}
          label={props.label}
          error={props.error}
          helperText={props.helperText}
        />
      )}
    </DatePicker>
  );
};

export default memo(DatePickerComponent);
