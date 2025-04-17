import Pagination from '@mui/material/Pagination';
import { memo } from 'react';
import styles from './styles';

const PaginationComponent = (props: any) => {
  const { children, ...rest } = props;

  return (
    <Pagination
      {...rest}
      sx={{
        '.MuiPaginationItem-root': {
          ...styles.nonSelectedHover,
          '&.Mui-selected': styles.selected,
        },
      }}
    >
      {children}
    </Pagination>
  );
};

export default memo(PaginationComponent);
