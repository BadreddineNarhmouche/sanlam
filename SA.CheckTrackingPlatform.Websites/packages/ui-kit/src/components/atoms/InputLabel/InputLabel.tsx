import { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import styles from './styles';

const InputLabelComponent = (props: any) => (
  <InputLabel {...props} style={styles.primary}>
    {props.children}
  </InputLabel>
);

export default memo(InputLabelComponent);
