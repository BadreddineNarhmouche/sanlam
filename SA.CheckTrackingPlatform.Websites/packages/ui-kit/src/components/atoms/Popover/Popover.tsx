import Popover from '@mui/material/Popover';
import { memo } from 'react';

const PopoverComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Popover {...rest}>{children}</Popover>;
};
export default memo(PopoverComponent);
