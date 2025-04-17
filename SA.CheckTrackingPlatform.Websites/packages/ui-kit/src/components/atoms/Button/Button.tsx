import { ComponentProps, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';

import styles from './styles';

type ButtonComponentProps = ComponentProps<typeof Button> & {
  [key: string]: any;
};

const ButtonComponent = (props: ButtonComponentProps) => (
  <Button
    {...props}
    sx={{
      ...styles,
      px: props.px || 3,
      py: props.py || 2,
      fontSize: props.fontSize || 12,
      ...(props.custombackgroundcolor && {
        backgroundColor: props.custombackgroundcolor,
      }),
    }}
  >
    {props.isLoading ? <CircularProgress color="secondary" size={24} /> :
      props.children}
  </Button>
);

export default memo(ButtonComponent);
