import { memo } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles';

const ChipComponent = (props: any) => (
  <Chip {...props} style={styles}>
    {props.children}
  </Chip>
);

export default memo(ChipComponent);
