import { memo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { styles } from './styles';

const AutocompleteComponent = (props: any) => (
  <Autocomplete
    {...props}
    fullWidth
    noOptionsText={'Aucune valeur trouvée'}
    sx={props.style ? props.style : styles}
  >
    {props.children}
  </Autocomplete>
);

export default memo(AutocompleteComponent);
