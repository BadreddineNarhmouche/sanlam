import { memo } from 'react';
import Badge from '@mui/material/Badge';

const BadgeComponent = (props: any) => {
  return <Badge {...props}>{props.children}</Badge>;
};

export default memo(BadgeComponent);
