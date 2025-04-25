import { ReactElement } from 'react';
import { UserService } from '@checkTracking/helpers';
import { NotFound } from '../NotFound';

interface Props {
  children: ReactElement;
}

export const RenderOnAnonymous = (props: Props) =>
  !UserService.isAuthenticated() ? props.children : <NotFound />;
