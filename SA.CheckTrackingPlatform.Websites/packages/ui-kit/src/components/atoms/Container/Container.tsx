import React, { memo } from 'react';
import Container from '@mui/material/Container';

const ContainerComponent = (props: any) => {
  return <Container {...props}>{props.children}</Container>;
};

export default memo(ContainerComponent);
