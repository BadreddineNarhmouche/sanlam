import React, { memo } from 'react';
import Toolbar from '@mui/material/Toolbar';

const ToolbarComponent = (props: any) => {
  return <Toolbar {...props} />;
};
export default memo(ToolbarComponent);
