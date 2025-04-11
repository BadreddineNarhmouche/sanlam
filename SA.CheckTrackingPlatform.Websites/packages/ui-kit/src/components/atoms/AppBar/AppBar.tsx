import React, { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import styles from './styles';

const AppBarComponent = (props: any) => {
  return <AppBar {...props} sx={styles} />;
};

export default memo(AppBarComponent);
