import { memo } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToggleButton } from '../../atoms';

const ToggleButtonGroupComponent = () => {
  return (
    <ToggleButtonGroup
      sx={{ variant: 'contained', backgroundColor: 'primary.main' }}
      aria-label="outlined primary button group"
    >
      <ToggleButton value="check" selected={false}>
        Button 1
      </ToggleButton>
      <ToggleButton value="check" selected={true}>
        Button 2
      </ToggleButton>
      <ToggleButton value="check" selected={false}>
        Button 3
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(ToggleButtonGroupComponent);
