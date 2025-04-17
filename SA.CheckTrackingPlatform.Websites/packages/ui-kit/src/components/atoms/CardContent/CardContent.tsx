import { memo } from 'react';
import CardContent from '@mui/material/CardContent';

const CardContentComponent = (props: any) => {
  return <CardContent {...props}>{props.children}</CardContent>;
};

export default memo(CardContentComponent);
