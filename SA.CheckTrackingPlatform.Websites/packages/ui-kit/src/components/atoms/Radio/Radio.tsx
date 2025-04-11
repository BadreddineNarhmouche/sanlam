import { memo } from 'react';
import Radio from '@mui/material/Radio';

const RadioComponent = (props: any) => {
  return <Radio {...props} />;
};

export default memo(RadioComponent);
