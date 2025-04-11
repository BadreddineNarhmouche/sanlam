import { GeneralHelper, UserService, LocalStorageHelper } from '@reinsurance/helpers';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    Typography,
} from '@reinsurance/ui-kit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MouseEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './styles';

export const User = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [currentInternalUser, setCurrentInternalUser] = useState<any>({});
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorElUser(null);
    };

    const handleUserSignOutMenuItemClick = () => {
        LocalStorageHelper.remove('currentUserRole');
        setAnchorElUser(null);
        UserService.signOut().then(() => {
            navigate('/');
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { firstName, lastName } = await UserService.getCurrentInternalUser();
                setCurrentInternalUser({
                    firstName,
                    lastName,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();        
    }, []);

    const getCurrentInternalUserFullName = () => {
        if (GeneralHelper.isObjectNotNull(currentInternalUser)) {
            return GeneralHelper.buildFullName(
                currentInternalUser.firstName,
                currentInternalUser.lastName,
            );
        } else {
            return '';
        }
    };

    const getCurrentInternalUserFullNameAbbreviation = () => {
        if (GeneralHelper.isObjectNotNull(currentInternalUser)) {
            return GeneralHelper.buildFullNameAbbreviation(
                currentInternalUser.firstName,
                currentInternalUser.lastName,
            );
        } else {
            return '';
        }
    };

    const stringAvatar = () => {
        return {
            sx: {
                backgroundColor: 'primary.main',
                color: 'base.main',
            },
            children: getCurrentInternalUserFullNameAbbreviation(),
        };
    };

    //#endregion Methods
    return (
        <Box style={styles.boxUser}>
            <Button>
                <Stack direction="row" spacing={2}>
                    <Avatar {...stringAvatar()} />
                </Stack>
            </Button>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center" >
                <Grid item>
                    <Typography
                        color="primary.dark"
                        variant="button"
                        style={styles.fullName}>
                        <>
                            {GeneralHelper.isStringNullOrEmpty(
                                getCurrentInternalUserFullName(),
                            ) ? (
                                <Skeleton />
                            ) : (
                                getCurrentInternalUserFullName()
                            )}
                        </>
                    </Typography>
                </Grid>
            </Grid>

            <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                style={styles.divider}
            />

            <Box style={styles.boxMenu}>
                <IconButton
                    aria-controls="menu-user"
                    onClick={handleMenuOpen}
                    sx={styles.iconButton}
                >
                    <ExpandMoreIcon sx={{ color: '.dark' }} />
                </IconButton>

                <Menu
                    id="menu-user"
                    sx={styles.menu}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleMenuClose}
                >
                    <MenuItem key="3">
                        <Typography
                            textAlign="center"
                            onClick={() => {
                                handleUserSignOutMenuItemClick();
                            }}
                        >
                            {intl.formatMessage({ id: 'nav_bar.logout_button' })}
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};
