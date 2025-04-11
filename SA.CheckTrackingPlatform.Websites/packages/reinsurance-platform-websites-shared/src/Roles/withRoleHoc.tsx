import { CardContainer, EmptyState } from '@reinsurance/ui-kit';
import emptyStateDesk from '@reinsurance/ui-kit/src/assets/images/product.svg';
import React from 'react';
import { ROLE } from './role-permission-maps';
import useRole from './useRole';

export const withRolesHoc =
    (allowedRoles: ROLE[]) =>
        (WrappedComponent: React.ComponentType<any>): React.FC =>
            ({ ...props }: any) => {
                const [currentRoles] = useRole();

                const isAllowed = currentRoles.some(role => allowedRoles.includes(role));

                if (isAllowed) {
                    return <WrappedComponent {...props} />;
                } else {
                    return (
                        <CardContainer px={8} pt={8} pb={15.5}>
                            <EmptyState
                                title={'Forbidden'}
                                subTitle={''}
                                image={emptyStateDesk}
                            />
                        </CardContainer>
                    );
                }
            };
