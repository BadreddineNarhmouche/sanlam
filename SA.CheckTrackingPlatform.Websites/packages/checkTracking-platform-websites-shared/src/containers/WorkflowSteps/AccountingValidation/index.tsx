import { GeneralHelper, IDeliverySlipDetailsService } from '@checkTracking/helpers';
import {
    Accordion,
    Button,
    FileListItem,
    Grid,
    Typography,
    UI_Typography,
    TextField,
} from '@checkTracking/ui-kit';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { STEP_STATUSES } from '../constants';
import { DialogConfirmation } from '../DialogConfirmation';
import { DocumentTypeCodeConstants } from '@checkTracking/helpers/lib/helpers/ConstantsHelper';

export const AccountingValidation = ({
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
    downloadTransitionFile,
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

    const [comment, setComment] = useState('');

    const {
        responseData: deliverySlipValidateAccounting,
        isLoading: isLoadingDeliverySlipValidateAccounting,
        error: errorDeliverySlipValidateAccounting } = useSelector(
            (state: any) => state.deliverySlipValidateAccounting,
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

    const { responseData: deliverySlipGetDocumentByCriteria,
        isLoading: isLoadingDeliverySlipGetDocumentByCriteria,
        error: errorDeliverySlipGetDocumentByCriteria } = useSelector(
            (state: any) => state.deliverySlipGetDocumentByCriteria,
        );

    const { responseData: deliverySlipDownloadDocumentByCriteria,
        isLoading: isLoadingDeliverySlipDownloadDocumentByCriteria,
        error: errorDeliverySlipDownloadDocumentByCriteria } = useSelector(
            (state: any) => state.deliverySlipDownloadDocumentByCriteria,
        );

    const [selectedSettlementNoteFile, setSelectedSettlementNoteFile] = useState<File | null>(null);
    const [selectedDeliverySlipDetailFile, setSelectedDeliverySlipDetailFile] = useState<File | null>(null);
    const [selectedOtherFiles, setSelectedOtherFiles] = useState<File[]>([]);

    const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
    const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

    const [documentIdToDownload, setDocumentIdToDownload] = useState<string | null>(null);
    const [documentIdToView, setDocumentIdToView] = useState<string | null>(null);

    const handleSubmit = () => {
        services.validateAccountingDeliverySlip &&
            services.validateAccountingDeliverySlip({
                externalTimelineHistoryId: currentTimelineId,
                externalNextTransitionId: nextTransitions[0]?.id,
                deliverySlipId: demand.id,
                comment: comment
            });
    }

    const displayTransitionFile = (id: string) => {
        services.getDeliverySlipDocumentById && services.getDeliverySlipDocumentById({ id });
    };

    useEffect(() => {
        if (deliverySlipGetDocumentById?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(deliverySlipGetDocumentById?.content)]));
            setPDFViewer && setPDFViewer({ file: url, fileName: `${deliverySlipGetDocumentById.name}`, open: true });
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
    }, [currentTimelineId]);

    const onDowloadFile = (file: any, documentTypeCode: string) => {
        if (file) {
            const url = window.URL.createObjectURL(new Blob([file]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.name);
            document.body.appendChild(link);
            link.click();
            link?.parentNode?.removeChild(link);
        } else {
            setDocumentIdToDownload(documentTypeCode);
            services.downloadDeliverySlipDocumentByCriteria && services.downloadDeliverySlipDocumentByCriteria({ deliverySlipId: demand.id, documentTypeCode });
        }
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
        if (deliverySlipDownloadDocumentByCriteria?.content) {
            setDocumentIdToDownload(null);
        }
    }, [deliverySlipDownloadDocumentByCriteria]);

    useEffect(() => {
        if (deliverySlipGetDocumentByCriteria?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(deliverySlipGetDocumentByCriteria?.content)]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${deliverySlipGetDocumentByCriteria.name}`, open: true }));
            setDialogOpen(true);
            services.clearGetDeliverySlipDocumentByCriteria && services.clearGetDeliverySlipDocumentByCriteria();
            setDocumentIdToView(null);
        }
    }, [deliverySlipGetDocumentByCriteria]);

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
                                        variant="body2"
                                        color="base.greyMain"
                                        mb={2}
                                    >
                                        Documents à exporter
                                    </Typography>
                                    <Grid item container spacing={2}>

                                        <Grid item xs={6}>
                                            <FileListItem
                                                file={selectedSettlementNoteFile}
                                                fileName='Note de règlement'
                                                documentTypes=".pdf"
                                                setFile={(file) => { setSelectedSettlementNoteFile(file) }}
                                                handleDownloadFile={() => onDowloadFile(selectedSettlementNoteFile, DocumentTypeCodeConstants.settlementNote)}
                                                handleViewFile={() => onDisplayFile(selectedSettlementNoteFile, DocumentTypeCodeConstants.settlementNote)}
                                                displayFile
                                                isLoading={isLoadingDeliverySlipDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.settlementNote}
                                                isLoadingView={isLoadingDeliverySlipGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.settlementNote}
                                                error={errorDeliverySlipDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.settlementNote}
                                                errorView={errorDeliverySlipGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.settlementNote}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FileListItem
                                                file={selectedDeliverySlipDetailFile}
                                                fileName="Détail bordereau"
                                                documentTypes=".pdf"
                                                setFile={(file) => { setSelectedDeliverySlipDetailFile(file) }}
                                                handleDownloadFile={() => onDowloadFile(selectedDeliverySlipDetailFile, DocumentTypeCodeConstants.deliverySlipDetail)}
                                                handleViewFile={() => onDisplayFile(selectedDeliverySlipDetailFile, DocumentTypeCodeConstants.deliverySlipDetail)}
                                                displayFile
                                                isLoading={isLoadingDeliverySlipDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.deliverySlipDetail}
                                                isLoadingView={isLoadingDeliverySlipGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.deliverySlipDetail}
                                                error={errorDeliverySlipDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.deliverySlipDetail}
                                                errorView={errorDeliverySlipGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.deliverySlipDetail}
                                            />
                                        </Grid>
                                    </Grid>
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
                                            onClick={() => setOpenConfiramtionDialog(true)} >
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
                        isLoading={isLoadingDeliverySlipValidateAccounting}
                        error={errorDeliverySlipValidateAccounting}
                        responseData={deliverySlipValidateAccounting}
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
                                <Grid item xs={12}>
                                    {transitionData?.otherDocuments?.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body2"
                                                color="base.greyMain"
                                                mb={2}
                                                mt={2}
                                            >
                                                Autre documents
                                            </Typography>
                                            <Grid item container spacing={2}>

                                                {transitionData?.otherDocuments?.map(
                                                    (document: any, index: number) => (
                                                        <Grid item xs={6} key={index}>
                                                            <FileListItem
                                                                fileName={document?.name}
                                                                handleDownloadFile={() => {
                                                                    downloadTransitionFile &&
                                                                        downloadTransitionFile({ id: document?.id });
                                                                    setDocumentIdToDownload(document?.id);
                                                                }}
                                                                handleViewFile={() => {
                                                                    displayTransitionFile(document?.id);
                                                                    setDocumentIdToView(document?.id);
                                                                }}
                                                                displayFile={document.contentType.includes('pdf')}
                                                                isLoading={isLoadingDeliverySlipDownloadDocumentById && documentIdToDownload === document?.id}
                                                                isLoadingView={isLoadingDeliverySlipGetDocumentById && (documentIdToView === document?.id)}
                                                                error={errorDeliverySlipDownloadDocumentById && documentIdToDownload === document?.id}
                                                                errorView={errorDeliverySlipGetDocumentById && documentIdToView === document?.id}
                                                            />
                                                        </Grid>
                                                    ),
                                                )}
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </>
                        }
                    />
                )}
            </Grid>
        </>
    );
};
