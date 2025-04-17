import React, { memo } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const SwipeableDrawerComponent = (props: any) => {
  return <SwipeableDrawer {...props} />;
};

export default memo(SwipeableDrawerComponent);
