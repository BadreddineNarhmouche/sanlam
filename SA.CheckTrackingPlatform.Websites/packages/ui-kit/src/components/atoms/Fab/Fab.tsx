import Fab from '@mui/material/Fab';
import { memo } from 'react';

const FabComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Fab {...rest}>{children}</Fab>;
};
export default memo(FabComponent);
