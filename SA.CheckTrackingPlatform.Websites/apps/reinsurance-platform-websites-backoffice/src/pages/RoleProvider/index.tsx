import useRole from '@reinsurance/shared/src/Roles/useRole';
import { Button, CardContainer, EmptyState, Grid, Icons, Skeleton, Stack } from '@reinsurance/ui-kit';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getInternalRolesByInternalUserElectronicAddress } from '../../store/InternalRoles/internalRolesSlice';
import { UserService } from '@reinsurance/helpers';

export default function RoleProvider({ children }: PropsWithChildren<any>) {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [allowRender, setAllowRender] = useState(false);
    const [isDispatched, setIsDispatched] = useState(false);


    const [currentRoles, setLocalStoredUserRoles] = useRole();
    const {
        responseData: internalRoles,
        isLoading: isLoadingRole,
        error: isErrorRole,
    } = useSelector((state: any) => state.internalRoles);

    useEffect(() => {
        if (currentRoles.length === 0 && !isErrorRole && !isDispatched) {
            dispatch(getInternalRolesByInternalUserElectronicAddress({}));
            setIsDispatched(true);
        } else {
            setAllowRender(true);
        }
    }, [currentRoles]);

    useEffect(() => {
        if (!internalRoles || internalRoles?.length === 0) return;
        const roleCodes = internalRoles.map((role: any) => (role.internalRoleCode));
        setLocalStoredUserRoles(roleCodes);
    }, [internalRoles]);

    if (isLoadingRole || (!currentRoles && !allowRender)) {
        return (
            <Stack spacing={2} mt={3}>
                <Skeleton variant="rectangular" mt={2} height={100} />
            </Stack>
        );
    }

    if (isErrorRole) {
        return (
            <CardContainer mt={3}>
                <EmptyState
                    title={intl.formatMessage({
                        id: 'error.api.title',
                    })}
                    subTitle={intl.formatMessage({
                        id: 'error.api.subTitle',
                    })}
                    action={{
                        label: intl.formatMessage({ id: 'button.retry' }),
                        startIcon: <Icons.Refresh />,
                        onClick: () => window.location.reload(),
                    }}
                />
                <Grid item xs paddingTop={2} sx={{ margin: '0 auto' }}>
                    <Button
                        onClick={() =>
                            UserService.signOut().then(() => {
                                window.location.reload();
                            })
                        }
                        variant="outlined" >
                        {intl.formatMessage({ id: 'nav_bar.logout_button' })}
                    </Button>
                </Grid>
            </CardContainer>
        );
    }

    if(!internalRoles || internalRoles?.length === 0){
        return (
            <CardContainer mt={3}>
                <EmptyState
                    title={intl.formatMessage({
                        id: 'user.not_authorized.title',
                    })}
                    subTitle={intl.formatMessage({
                        id: 'user.not_authorized.subTitle',
                    })}
                />
                <Grid item xs paddingTop={2} sx={{ margin: '0 auto' }}>
                    <Button
                        onClick={() =>
                            UserService.signOut().then(() => {
                                window.location.reload();
                            })
                        }
                        variant="outlined" >
                        {intl.formatMessage({ id: 'nav_bar.logout_button' })}
                    </Button>
                </Grid>
            </CardContainer>
        );
    }

    return children;
}