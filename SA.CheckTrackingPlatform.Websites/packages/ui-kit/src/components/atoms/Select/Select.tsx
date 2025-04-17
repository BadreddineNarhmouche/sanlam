import { memo } from 'react';
import Select from '@mui/material/Select';

const SelectComponent = (props: any) => (
  <Select {...props}>{props.children}</Select>
);

export default memo(SelectComponent);
