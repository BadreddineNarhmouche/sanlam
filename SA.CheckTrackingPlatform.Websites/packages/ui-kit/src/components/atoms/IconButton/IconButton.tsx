import { memo } from 'react';
import StyledIconButton from './styles';

const IconButtonComponent = (props: any) => (
  <StyledIconButton {...props}>{props.children}</StyledIconButton>
);
export default memo(IconButtonComponent);
