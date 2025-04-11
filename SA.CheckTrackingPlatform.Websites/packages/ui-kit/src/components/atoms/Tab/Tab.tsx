import { memo } from 'react';
import Tab from '@mui/material/Tab';
import styles from './styles';

const TabComponent = (props: any) => {
  return (
    <Tab disableRipple {...props} sx={styles}>
      {props.children}
    </Tab>
  );
};

export default memo(TabComponent);
