import { memo } from 'react';
import Tooltip from '@mui/material/Tooltip';

const TooltipComponent = (props: any) => {
  return <Tooltip {...props}>{props.children}</Tooltip>;
};
export default memo(TooltipComponent);
