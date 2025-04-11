import { memo } from 'react';
import CardActions from '@mui/material/CardActions';

const CardActionsComponent = (props: any) => {
  return <CardActions {...props}>{props.children}</CardActions>;
};

export default memo(CardActionsComponent);
