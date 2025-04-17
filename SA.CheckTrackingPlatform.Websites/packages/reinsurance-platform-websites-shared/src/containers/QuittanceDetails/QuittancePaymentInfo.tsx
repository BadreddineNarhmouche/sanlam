import { Grid, Icons, Typography } from '@reinsurance/ui-kit';
import { useIntl } from 'react-intl';
import { container, headerInfoStyle, infoStyle, sectionTitle } from './styles';
import { quittancePaymentStatusComponent } from '../../utils/QuittanceHelpers';
import { QuittancePayment } from '@reinsurance/helpers';

export const QuittancePaymentInfo = ({
    quittancePayment,
}: {
    quittancePayment: QuittancePayment;
}) => {
    const intl = useIntl();

    return (
        <>
            <Grid item py={3}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="baseline"
                    p={3}
                    {...container}
                >
                    <Grid item container xs={12} pb={1}>
                        <Icons.AssignmentTurnedInOutlined />
                        <Typography variant="h7" {...sectionTitle} ml={2}>
                            {intl.formatMessage({ id: 'quittance_details.policy_payment_info' })}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} pt={1} ml={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_net_premium',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.premiumAmount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_total_premium',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.totalAmount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_accessory',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.accessoryAmount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_commission',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.commissionAmount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_net_payable',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.amountToPay}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_net_difference_to_pay',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.differenceNetAmountToPay}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_date_of_receipt',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="button" {...infoStyle}>
                                            {quittancePayment.dateReceiptValue}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="button" {...headerInfoStyle}>
                                            {intl.formatMessage({
                                                id: 'quittance_details.policy_payment_status',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        {quittancePaymentStatusComponent(
                                            quittancePayment.statusCode,
                                            quittancePayment.statusLabel
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
