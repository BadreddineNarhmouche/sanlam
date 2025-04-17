import { GeneralHelper, translate } from '@reinsurance/helpers';
import {
    Alert,
    Button,
    Dialog,
    Grid,
    Icons,
    Table,
    Typography,
} from '@reinsurance/ui-kit';
import { FormattedMessage, useIntl } from 'react-intl';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT, REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT } from '../../constants';

interface Props {
    openConfiramtionDialog: boolean;
    setOpenConfiramtionDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setSelected: any;
    setSelectedQuittanceLine: any;
    handleSubmit: () => void;
    handleCancel?: () => void;
    isLoading: boolean;
    error: boolean;
    responseData: any;
    choice?: string;
    selectedQuittanceLine: any[];
}

export const DeliverySlipCreation = ({
    openConfiramtionDialog,
    setOpenConfiramtionDialog,
    setSelected,
    setSelectedQuittanceLine,
    handleSubmit,
    choice,
    isLoading,
    error,
    responseData,
    handleCancel,
    selectedQuittanceLine
}: Props) => {
    useEffect(() => {
        if (!isLoading && !error && !isEmpty(responseData)) {
            setOpenConfiramtionDialog(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseData]);

    const intl = useIntl();

    return (
        <Dialog
            fullWidth
            open={openConfiramtionDialog}
            footerWithBorder={true}
            title={<FormattedMessage id="deliverySlip_creation_dialog_title" />}
            content={
                <>
                    <Typography variant="body2">
                        <FormattedMessage
                            id="deliverySlip_creation_dialog_message"
                            values={{
                                choice: !GeneralHelper.isStringNullOrEmpty(choice) ? (
                                    <span style={{ fontWeight: 'bold' }}>{`"${choice}"`}</span>
                                ) : (
                                    ''
                                ),
                            }}
                        />
                    </Typography>

                    {selectedQuittanceLine?.length > 0 &&
                        <Grid item xs={12} mt={3}>
                            <Table
                                isCollapsable={true}
                                rows={selectedQuittanceLine}
                                columns={REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT}
                                hiddenColumns={REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT}
                            />
                        </Grid>
                    }

                    {error && (
                        <Grid item xs={12} mt={3}>
                            <Alert
                                withBoxStyle={true}
                                severity={'error'}
                                icon={<Icons.Error />}
                            >
                                <Typography variant="button">
                                    {translate('error.api.title', intl)}
                                </Typography>
                            </Alert>
                        </Grid>
                    )}
                </>
            }
            actions={
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelected([]);
                            setSelectedQuittanceLine([]);
                            setOpenConfiramtionDialog(false);
                            handleCancel && handleCancel();
                        }}
                        disabled={isLoading}
                    >
                        <Typography variant="button">
                            <FormattedMessage id="button.abandon" />
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelected([]);
                            setSelectedQuittanceLine([]);
                            handleSubmit && handleSubmit();
                        }}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <CircularProgress color="primary" size={24} sx={{ mr: 1 }} />
                        )}
                        <Typography variant="button">
                            <FormattedMessage
                                id={error ? 'button.retry' : 'button.confirm'}
                            />
                        </Typography>
                    </Button>
                </>
            }
        />
    );
};
