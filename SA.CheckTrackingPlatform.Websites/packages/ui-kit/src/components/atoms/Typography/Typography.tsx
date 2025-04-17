import { memo } from 'react';
import Typography from '@mui/material/Typography';

const TypographyComponent = (props: any) => (
  <Typography {...props} textTransform={'none'}>
    {props.children}
  </Typography>
);

export default memo(TypographyComponent);
