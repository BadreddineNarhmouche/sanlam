import { memo } from 'react';
import Link from '@mui/material/Link';

const LinkComponent = (props: any) => <Link {...props}>{props.children}</Link>;

export default memo(LinkComponent);
