import React, { memo } from 'react';
import Stack from '@mui/material/Stack';

const StackComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Stack {...rest}>{children}</Stack>;
};

export default memo(StackComponent);
