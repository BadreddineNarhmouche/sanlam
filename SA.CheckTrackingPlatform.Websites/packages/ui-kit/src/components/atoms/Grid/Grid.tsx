import { memo } from 'react';
import Grid from '@mui/material/Grid';

const GridComponent = (props: any) => {
  return <Grid {...props}>{props.children}</Grid>;
};

export default memo(GridComponent);
