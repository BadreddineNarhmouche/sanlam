import { IQuittanceDetailsService } from '@reinsurance/helpers';
import {
    Accordion,
    Button,
    Grid,
    Typography,
    UI_Typography,
    TextField,
} from '@reinsurance/ui-kit';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { STEP_STATUSES } from '../constants';
import { DialogConfirmation } from '../DialogConfirmation';

export const RecoveryValidation = ({
    status,
    readOnly,
    titleDoing,
    titleDone,
    statusDate,
    handleChangeData,
    publicContentDoing,
    currentTimelineId,
    nextTransitions,
    defaultData,
    services,
    transitionData,
    demand,
}: {
    status: string;
    readOnly: boolean;
    titleDoing?: string;
    titleDone?: string;
    statusDate?: any;
    handleChangeData: (data: any) => void;
    publicContentDoing?: string;
    currentTimelineId: string;
    nextTransitions: any;
    defaultData?: string;
    services: IQuittanceDetailsService;
    transitionData?: any;
    demand?: any;
}) => {

    const [comment, setComment] = useState('');

    const {
        responseData: quittanceValidateRecovery,
        isLoading: isLoadingQuittanceValidateRecovery,
        error: errorQuittanceValidateRecovery } = useSelector(
            (state: any) => state.quittanceValidateRecovery,
        );

    const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
    const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

    const handleSubmit = () => {
        services.validateRecoveryQuittance &&
            services.validateRecoveryQuittance({
                externalTimelineHistoryId: currentTimelineId,
                externalNextTransitionId: nextTransitions[0]?.id,
                quittanceId: demand.id,
                comment: comment
            });
    }

    useEffect(() => {
        if (status === STEP_STATUSES.TODO) {
            handleChangeData &&
                handleChangeData({
                    files: [],
                    comment: defaultData || '',
                    policyReference: '',
                });
        }
    }, [currentTimelineId]);

    return (
        <>
            {status === STEP_STATUSES.TODO && (
                <>
                    {readOnly ? (
                        <Grid
                            container
                            flexDirection="column"
                            spacing={2}
                            pl={2}
                            pr={4}
                            py={1}
                            ml={0}
                            mt={1}
                            style={{
                                border: '1px solid #EBEEF1',
                                borderRadius: 4,
                            }}
                            backgroundColor="base.main"
                        >
                            <Grid item xs>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                                >
                                    {titleDoing}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                                >
                                    {publicContentDoing}
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            container
                            flexDirection="column"
                            spacing={2}
                            pl={2}
                            pr={4}
                            py={1}
                            ml={0}
                            mt={1}
                            style={{
                                border: '1px solid #EBEEF1',
                                borderRadius: 4,
                            }}
                            backgroundColor="base.main"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                                    >
                                        {titleDoing}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                                    >
                                        Commentaire
                                    </Typography>
                                    <TextField
                                        label="Commentaire"
                                        multiline
                                        rows={4}
                                        value={comment}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setComment(e.target.value); }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item container xs={12}>
                                    <Grid item xs></Grid>
                                    <Grid item xs style={{ textAlign: 'right' }}>
                                        <Button
                                            variant="contained"
                                            fontSize={14}
                                            fullWidth
                                            onClick={() => setOpenConfiramtionDialog(true)}
                                            disabled={!comment}
                                        >
                                            <Typography variant="body1" fontWeight={500} ml={1}>
                                                <FormattedMessage
                                                    id={
                                                        'button.validate'
                                                    }
                                                />
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <DialogConfirmation
                        openConfiramtionDialog={openConfiramtionDialog}
                        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
                        handleSubmit={handleSubmit}
                        isLoading={isLoadingQuittanceValidateRecovery}
                        error={errorQuittanceValidateRecovery}
                        responseData={quittanceValidateRecovery}
                    />
                </>
            )}
            <Grid item xs backgroundColor="base.main">
                {status === STEP_STATUSES.DONE && (
                    <Accordion
                        title={
                            <Grid>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                                >
                                    {titleDone}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                                    color="grey"
                                >
                                    <FormattedMessage
                                        id="quittance_details.creation_date"
                                        values={{
                                            date: format(formattedStatusDate, 'dd MMMM yyyy', {
                                                locale: fr,
                                            }),

                                            time: format(formattedStatusDate, 'HH:mm'),
                                        }}
                                    />
                                </Typography>
                            </Grid>
                        }
                        expandedValue={1}
                        children={
                            <>
                                {transitionData?.quittanceTimeLine?.comment && <>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="base.greyMain"
                                            mb={2}
                                            mt={2}
                                        >
                                            Commentaire
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            mb={2}
                                            mt={2}
                                        >
                                            {transitionData?.quittanceTimeLine?.comment}
                                        </Typography>
                                    </Grid></>
                                }
                            </>
                        }
                    />
                )}
            </Grid>
        </>
    );
};
