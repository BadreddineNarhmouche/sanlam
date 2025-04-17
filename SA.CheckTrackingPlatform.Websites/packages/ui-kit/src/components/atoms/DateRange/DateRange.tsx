import { fr } from 'date-fns/locale';
import { memo } from 'react';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import Grid from '../Grid/Grid';
import styles from './styles';

const DateRange = (props: any) => {
  return (
    <DateRangePicker
      {...(props.startDate ? { startDate: new Date(props.startDate) } : {})}
      {...(props.endDate ? { endDate: new Date(props.endDate) } : {})}
      onStartDateChange={props.setStartDate}
      onEndDateChange={props.setEndDate}
      minimumLength={1}
      format="dd-MM-yyyy"
      locale={fr}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <Grid container columnSpacing={1} mt={1}>
          <Grid item xs display="grid">
            <input
              className={'input' + (focus === 'startDate' ? ' -focused' : '')}
              {...startDateInputProps}
              placeholder={props.fromDateLabel}
              style={styles.dateInput}
            />
          </Grid>
          <Grid item xs display="grid">
            <input
              className={'input' + (focus === 'endDate' ? ' -focused' : '')}
              {...endDateInputProps}
              placeholder={props.toDateLabel}
              style={styles.dateInput}
            />
          </Grid>
        </Grid>
      )}
    </DateRangePicker>
  );
};

export default memo(DateRange);
