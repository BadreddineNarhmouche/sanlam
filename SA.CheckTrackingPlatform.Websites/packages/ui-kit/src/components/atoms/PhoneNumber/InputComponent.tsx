import { forwardRef } from 'react';
import TextField from '../TextField/TextField';

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string | number;
  [key: string]: any;
  onPaste?: any;
}

const InputComponent = (props: InputProps, ref: any) => {
  const { error, label, width } = props;

  return (
    <TextField
      {...props}
      inputRef={ref}
      label={label}
      variant="outlined"
      error={error}
      style={{
        width: width ? width : '90%',
      }}
    />
  );
};

export default forwardRef(InputComponent);
