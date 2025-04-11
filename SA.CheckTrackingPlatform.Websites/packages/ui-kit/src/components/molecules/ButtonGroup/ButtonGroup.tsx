import { memo } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

function ButtonGroupComponent(props: any) {
  return <ButtonGroup {...props}>{props.children}</ButtonGroup>;
}
export default memo(ButtonGroupComponent);
