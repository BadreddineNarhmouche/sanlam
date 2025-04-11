import { memo } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

const InputAdornmentComponent = (props: any) => (
  <InputAdornment {...props}>{props.children}</InputAdornment>
);

export default memo(InputAdornmentComponent);
