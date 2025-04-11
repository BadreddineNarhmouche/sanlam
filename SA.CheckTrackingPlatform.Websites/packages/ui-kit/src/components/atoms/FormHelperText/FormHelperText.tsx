import { memo } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const FormHelperTextComponent = (props: any) => (
  <FormHelperText {...props}>{props.children}</FormHelperText>
);

export default memo(FormHelperTextComponent);
