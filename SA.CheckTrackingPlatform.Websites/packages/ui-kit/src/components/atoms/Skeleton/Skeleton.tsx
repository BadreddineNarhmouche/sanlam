import React, { memo } from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonComponent = (props: any) => {
  const { children, ...rest } = props;

  return <Skeleton {...rest}>{children}</Skeleton>;
};
export default memo(SkeletonComponent);
