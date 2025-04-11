import { ReactElement } from 'react';
import { UserService } from '@reinsurance/helpers';
import { NotFound } from '../NotFound';

interface Props {
  children: ReactElement;
}
export const RenderOnAuthenticated = (props: Props) =>
  UserService.isAuthenticated() ? props.children : <NotFound />;
