import React, { ComponentProps, memo } from 'react';
import CheckBox from '@mui/material/Checkbox';

type CheckBoxComponentProps = ComponentProps<typeof CheckBox> & {
  [key: string]: any;
};

const CheckBoxComponent = (props: CheckBoxComponentProps) => {
  // @ts-ignore : TODO: check if this component use childrens anywhere before removing it.
  return <CheckBox {...props}>{props.children}</CheckBox>;
};

export default memo(CheckBoxComponent);
