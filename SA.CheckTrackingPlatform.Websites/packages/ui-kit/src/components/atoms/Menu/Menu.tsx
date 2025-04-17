import React, { memo } from 'react';
import Menu from '@mui/material/Menu';

const MenuComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Menu {...rest}>{children}</Menu>;
};

export default memo(MenuComponent);
