import { memo } from 'react';
import MenuItem from '@mui/material/MenuItem';

const MenuItemComponent = (props: any) => (
  <MenuItem {...props}>{props.children}</MenuItem>
);

export default memo(MenuItemComponent);
