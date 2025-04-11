import { memo } from 'react';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';

const ToggleButtonComponent: React.FC<ToggleButtonProps> = ({
  children,
  ...rest
}) => {
  return <ToggleButton {...rest}>{children}</ToggleButton>;
};

export default memo(ToggleButtonComponent);
