import { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import styles from './styles';

const FormControlComponent = (props: any) => (
  <FormControl {...props} style={styles.primary}>
    {props.children}
  </FormControl>
);

export default memo(FormControlComponent);
