import { memo } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

const FormControlLabelComponent = (props: any) => (
  <FormControlLabel {...props}>{props.children}</FormControlLabel>
);

export default memo(FormControlLabelComponent);
