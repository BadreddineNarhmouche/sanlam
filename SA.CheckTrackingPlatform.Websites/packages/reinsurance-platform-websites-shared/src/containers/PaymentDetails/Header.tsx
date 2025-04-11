import { Payment, translate } from '@reinsurance/helpers';
import {
    Grid,
    IconButton,
    Icons,
    Typography,
    UI_Typography,
} from '@reinsurance/ui-kit';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { headerStyle } from './styles';

const Header = (props: { payment: Payment | any; intl: any }) => {
    const navigate = useNavigate();

    return (
        <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            display="flex"
            pt={1}
            pb={1}
            px={4}
            gap={1}
            sx={headerStyle} >
            <Grid item>
                <Grid display="flex" flexDirection="row" alignItems="center">
                    <IconButton
                        aria-controls="menu-appbar"
                        color="primary"
                        onClick={() => navigate(
                            `${'/'}?tab=${1}`,
                        )} >
                        <Icons.ArrowBack color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default injectIntl(Header);
