import React, { memo } from 'react';
import Divider from '@mui/material/Divider';

const DividerComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Divider {...rest}>{children}</Divider>;
};
export default memo(DividerComponent);
