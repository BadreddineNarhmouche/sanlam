import React, { memo } from 'react';
import Box from '@mui/material/Box';

const BoxComponent = (props: any) => {
  return <Box {...props}>{props.children}</Box>;
};

export default memo(BoxComponent);
