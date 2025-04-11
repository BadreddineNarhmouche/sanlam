import { memo } from 'react';
import Card from '@mui/material/Card';

const CardComponent = (props: any) => {
  return <Card {...props}>{props.children}</Card>;
};

export default memo(CardComponent);
