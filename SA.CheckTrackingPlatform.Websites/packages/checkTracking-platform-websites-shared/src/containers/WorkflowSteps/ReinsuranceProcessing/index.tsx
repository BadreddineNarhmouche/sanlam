import { GeneralHelper, IDeliverySlipDetailsService } from '@checkTracking/helpers';
import {
    Accordion,
    Button,
    FileListItem,
    Grid,
    Typography,
    UI_Typography,
    UploadFiles,
    TextField,
    Table,
} from '@checkTracking/ui-kit';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { STEP_STATUSES } from '../constants';
import { DialogConfirmation } from '../DialogConfirmation';
import { REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT, REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT } from '../../Quittances/constants';

export const ReinsuranceProcessing = ({
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
    downloadTransitionFile,
    demand,
    setDialogOpen,
    setPDFViewer,
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
    services: IDeliverySlipDetailsService;
    publicContentDone?: string;
    transitionData?: any;
    demand?: any;
    downloadTransitionFile?: (payload: any) => void;
    setDialogOpen?: any;
    setPDFViewer?: React.Dispatch<React.SetStateAction<{
        file: string | null;
        fileName: string;
        open: boolean;
    }>>;
}) => {
    const intl = useIntl();

    const [comment, setComment] = useState('');

    const {
        responseData: deliverySlipTreatReinsurance,
        isLoading: isLoadingDeliverySlipTreatReinsurance,
        error: errorDeliverySlipTreatReinsurance } = useSelector(
            (state: any) => state.deliverySlipTreatReinsurance,
        );

    const { responseData: deliverySlipGetDocumentById,
        isLoading: isLoadingDeliverySlipGetDocumentById,
        error: errorDeliverySlipGetDocumentById } = useSelector(
            (state: any) => state.deliverySlipGetDocumentById,
        );

    const { responseData: deliverySlipDownloadDocumentById,
        isLoading: isLoadingDeliverySlipDownloadDocumentById,
        error: errorDeliverySlipDownloadDocumentById } = useSelector(
            (state: any) => state.deliverySlipDownloadDocumentById,
        );

    const [selectedOtherFiles, setSelectedOtherFiles] = useState<File[]>([]);
    const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
    const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

    const [documentIdToDownload, setDocumentIdToDownload] = useState<string | null>(null);
    const [documentIdToView, setDocumentIdToView] = useState<string | null>(null);

    const handleSubmit = () => {
        services.treatReinsuranceDeliverySlip &&
            services.treatReinsuranceDeliverySlip({
                externalTimelineHistoryId: currentTimelineId,
                externalNextTransitionId: nextTransitions[0]?.id,
                deliverySlipId: demand.id,
                documents: selectedOtherFiles,
                comment: comment
            });
    }

    const displayTransitionFile = (id: string) => {
        services.getDeliverySlipDocumentById && services.getDeliverySlipDocumentById({ id });
    };

    const onDisplayFile = (file: any, documentTypeCode?: string) => {
        if (file) {
            const url = window.URL.createObjectURL(new Blob([file]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${file.name}`, open: true }));
            setDialogOpen(true);
        } else if (documentTypeCode) {
            setDocumentIdToView(documentTypeCode);
            services.getDeliverySlipDocumentByCriteria && services.getDeliverySlipDocumentByCriteria({ deliverySlipId: demand.id, documentTypeCode });
        }
    };

    useEffect(() => {
        if (deliverySlipGetDocumentById?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(deliverySlipGetDocumentById?.content)]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${deliverySlipGetDocumentById.name}`, open: true }));
            setDialogOpen(true);
            services.clearGetDeliverySlipDocumentById && services.clearGetDeliverySlipDocumentById();
            setDocumentIdToView(null);
        }
    }, [deliverySlipGetDocumentById]);

    useEffect(() => {
        if (deliverySlipDownloadDocumentById?.content) {
            setDocumentIdToDownload(null);
        }
    }, [deliverySlipDownloadDocumentById]);

    useEffect(() => {
        if (status === STEP_STATUSES.TODO) {
            handleChangeData &&
                handleChangeData({
                    files: [],
                    comment: defaultData || '',
                    policyReference: '',
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

                                {demand?.items?.length > 0 &&
                                    <Grid item xs={12} mt={3}>
                                        <Table
                                            isCollapsable={true}
                                            rows={demand.items}
                                            columns={REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT}
                                            hiddenColumns={REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT}
                                        />
                                    </Grid>
                                }
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
                                            onClick={() => setOpenConfiramtionDialog(true)} >
                                            <Typography variant="body1" fontWeight={500} ml={1}>
                                                <FormattedMessage
                                                    id={
                                                        'deliverySlip.treat.button.validate'
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
                        isLoading={isLoadingDeliverySlipTreatReinsurance}
                        error={errorDeliverySlipTreatReinsurance}
                        responseData={deliverySlipTreatReinsurance}
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
                                        id="deliverySlip_details.creation_date"
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
                                {demand?.items?.length > 0 &&
                                    <Grid item xs={12} mt={3}>
                                        <Table
                                            isCollapsable={true}
                                            rows={demand.items}
                                            columns={REINSURANCE_QUITTANCELINE_DELIVERYSLIP_CREATION_COLUMNS_DEFAULT}
                                            hiddenColumns={REINSURANCE_DELIVERYSLIP_CREATION_TABLE_HIDDEN_COLUMNS_DEFAULT}
                                        />
                                    </Grid>
                                }
                                {transitionData?.deliverySlipTimeLine?.comment && <>
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
                                            {transitionData?.deliverySlipTimeLine?.comment}
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
