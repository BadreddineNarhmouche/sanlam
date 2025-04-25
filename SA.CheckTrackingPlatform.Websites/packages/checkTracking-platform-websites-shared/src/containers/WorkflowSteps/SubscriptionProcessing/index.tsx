import { GeneralHelper, IQuittanceDetailsService } from '@checkTracking/helpers';
import {
    Accordion,
    Button,
    FileListItem,
    Grid,
    Typography,
    UI_Typography,
    UploadFiles,
    TextField,
} from '@checkTracking/ui-kit';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { STEP_STATUSES } from '../constants';
import { DialogConfirmation } from '../DialogConfirmation';
import { DocumentTypeCodeConstants } from '@checkTracking/helpers/lib/helpers/ConstantsHelper';

export const SubscriptionProcessing = ({
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
    services: IQuittanceDetailsService;
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
        responseData: quittanceTreatSubscription,
        isLoading: isLoadingQuittanceTreatSubscription,
        error: errorQuittanceTreatSubscription } = useSelector(
            (state: any) => state.quittanceTreatSubscription,
        );

    const { responseData: quittanceGetDocumentById,
        isLoading: isLoadingQuittanceGetDocumentById,
        error: errorQuittanceGetDocumentById } = useSelector(
            (state: any) => state.quittanceGetDocumentById,
        );

    const { responseData: quittanceDownloadDocumentById,
        isLoading: isLoadingQuittanceDownloadDocumentById,
        error: errorQuittanceDownloadDocumentById } = useSelector(
            (state: any) => state.quittanceDownloadDocumentById,
        );

    const { responseData: quittanceGetDocumentByCriteria,
        isLoading: isLoadingQuittanceGetDocumentByCriteria,
        error: errorQuittanceGetDocumentByCriteria } = useSelector(
            (state: any) => state.quittanceGetDocumentByCriteria,
        );

    const { responseData: quittanceDownloadDocumentByCriteria,
        isLoading: isLoadingQuittanceDownloadDocumentByCriteria,
        error: errorQuittanceDownloadDocumentByCriteria } = useSelector(
            (state: any) => state.quittanceDownloadDocumentByCriteria,
        );

    const [selectedCoverNoteFile, setSelectedCoverNoteFile] = useState<File | null>(null);
    const [selectedHonorDeclarationFile, setSelectedHonorDeclarationFile] = useState<File | null>(null);
    const [selectedOtherFiles, setSelectedOtherFiles] = useState<File[]>([]);
    const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
    const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

    const [documentIdToDownload, setDocumentIdToDownload] = useState<string | null>(null);
    const [documentIdToView, setDocumentIdToView] = useState<string | null>(null);

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
            services.downloadQuittanceDocumentByCriteria && services.downloadQuittanceDocumentByCriteria({ quittanceId: demand.id, documentTypeCode });
        }
    };

    const handleSubmit = () => {
        services.treatSubscriptionQuittance &&
            services.treatSubscriptionQuittance({
                externalTimelineHistoryId: currentTimelineId,
                externalNextTransitionId: nextTransitions[0]?.id,
                quittanceId: demand.id,
                honorDeclarationDocument: selectedHonorDeclarationFile,
                coverNoteDocument: selectedCoverNoteFile,
                documents: selectedOtherFiles,
                comment: comment
            });
    }

    const displayTransitionFile = (id: string) => {
        services.getQuittanceDocumentById && services.getQuittanceDocumentById({ id });
    };

    const onDisplayFile = (file: any, documentTypeCode?: string) => {
        if (file) {
            const url = window.URL.createObjectURL(new Blob([file]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${file.name}`, open: true }));
            setDialogOpen(true);
        } else if (documentTypeCode) {
            setDocumentIdToView(documentTypeCode);
            services.getQuittanceDocumentByCriteria && services.getQuittanceDocumentByCriteria({ quittanceId: demand.id, documentTypeCode });
        }
    };

    useEffect(() => {
        if (quittanceGetDocumentByCriteria?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(quittanceGetDocumentByCriteria?.content)]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${quittanceGetDocumentByCriteria.name}`, open: true }));
            setDialogOpen(true);
            services.clearGetQuittanceDocumentByCriteria && services.clearGetQuittanceDocumentByCriteria();
            setDocumentIdToView(null);
        }
    }, [quittanceGetDocumentByCriteria]);

    useEffect(() => {
        if (quittanceDownloadDocumentByCriteria?.content) {
            setDocumentIdToDownload(null);
        }
    }, [quittanceDownloadDocumentByCriteria]);

    useEffect(() => {
        if (quittanceGetDocumentById?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(quittanceGetDocumentById?.content)]));
            setPDFViewer && setPDFViewer(prevState => ({ ...prevState, file: url, fileName: `${quittanceGetDocumentById.name}`, open: true }));
            setDialogOpen(true);
            services.clearGetQuittanceDocumentById && services.clearGetQuittanceDocumentById();
            setDocumentIdToView(null);
        }
    }, [quittanceGetDocumentById]);

    useEffect(() => {
        if (quittanceDownloadDocumentById?.content) {
            setDocumentIdToDownload(null);
        }
    }, [quittanceDownloadDocumentById]);

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
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="base.greyMain"
                                        mb={2}
                                    >
                                        Documents à afficher
                                    </Typography>
                                    <Grid item container spacing={2}>

                                        <Grid item xs={6}>
                                            <FileListItem
                                                file={selectedCoverNoteFile}
                                                fileName='Note de couverture'
                                                handleUploadFile={() => { }}
                                                documentTypes=".pdf"
                                                setFile={(file) => { setSelectedCoverNoteFile(file) }}
                                                handleDownloadFile={() => onDowloadFile(selectedCoverNoteFile, DocumentTypeCodeConstants.coverNote)}
                                                handleViewFile={() => onDisplayFile(selectedCoverNoteFile, DocumentTypeCodeConstants.coverNote)}
                                                displayFile
                                                isLoading={isLoadingQuittanceDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.coverNote}
                                                isLoadingView={isLoadingQuittanceGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.coverNote}
                                                error={errorQuittanceDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.coverNote}
                                                errorView={errorQuittanceGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.coverNote}
                                                fileDescription={selectedCoverNoteFile ? 'Document signé ✔' : ''}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FileListItem
                                                file={selectedHonorDeclarationFile}
                                                fileName="Déclaration sur l'honneur"
                                                handleUploadFile={() => { }}
                                                documentTypes=".pdf"
                                                setFile={(file) => { setSelectedHonorDeclarationFile(file) }}
                                                handleDownloadFile={() => onDowloadFile(selectedHonorDeclarationFile, DocumentTypeCodeConstants.honorDeclaration)}
                                                handleViewFile={() => onDisplayFile(selectedHonorDeclarationFile, DocumentTypeCodeConstants.honorDeclaration)}
                                                displayFile
                                                isLoading={isLoadingQuittanceDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.honorDeclaration}
                                                isLoadingView={isLoadingQuittanceGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.honorDeclaration}
                                                error={errorQuittanceDownloadDocumentByCriteria && documentIdToDownload === DocumentTypeCodeConstants.honorDeclaration}
                                                errorView={errorQuittanceGetDocumentByCriteria && documentIdToView === DocumentTypeCodeConstants.honorDeclaration}
                                                fileDescription={selectedHonorDeclarationFile ? 'Document signé ✔' : ''}
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
                                <Grid item xs={12}>
                                    <UploadFiles
                                        name={'files'}
                                        setFieldValue={(name: string, value: any) =>
                                            setSelectedOtherFiles(value)
                                        }
                                        values={selectedOtherFiles}
                                        documentTypes=".pdf,image/png,image/gif,image/jpeg"
                                        documentTypesLabel={intl.formatMessage({ id: 'input.upload.description' })}
                                        multipleSelect
                                        handleViewFile={(file) => onDisplayFile(file)}
                                    />
                                </Grid>
                                <Grid item container xs={12}>
                                    <Grid item xs></Grid>
                                    <Grid item xs style={{ textAlign: 'right' }}>
                                        <Button
                                            variant="contained"
                                            fontSize={14}
                                            onClick={() => setOpenConfiramtionDialog(true)}
                                            disabled={!(selectedCoverNoteFile)}
                                        >
                                            <Typography variant="body1" fontWeight={500} ml={1}>
                                                <FormattedMessage
                                                    id={
                                                        'quittance.treat.button.validate'
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
                        isLoading={isLoadingQuittanceTreatSubscription}
                        error={errorQuittanceTreatSubscription}
                        responseData={quittanceTreatSubscription}
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
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="base.greyMain"
                                        mb={2}
                                    >
                                        Documents
                                    </Typography>
                                    <Grid item container spacing={2}>
                                        <Grid item xs={6}>
                                            <FileListItem
                                                fileName={transitionData?.coverNoteDocument?.documentTypeLabel}
                                                file={transitionData?.coverNoteDocument}
                                                handleDownloadFile={() => {
                                                    (downloadTransitionFile &&
                                                        downloadTransitionFile({ id: transitionData?.coverNoteDocument?.id }));
                                                    setDocumentIdToDownload(transitionData?.coverNoteDocument?.id);
                                                }}
                                                handleViewFile={() => {
                                                    displayTransitionFile(transitionData?.coverNoteDocument?.id);
                                                    setDocumentIdToView(transitionData?.coverNoteDocument?.id);
                                                }}
                                                displayFile={transitionData?.coverNoteDocument?.contentType.includes('pdf')}
                                                isLoading={isLoadingQuittanceDownloadDocumentById && (documentIdToDownload === transitionData?.coverNoteDocument?.id)}
                                                isLoadingView={isLoadingQuittanceGetDocumentById && (documentIdToView === transitionData?.coverNoteDocument?.id)}
                                                error={errorQuittanceDownloadDocumentById && documentIdToDownload === transitionData?.coverNoteDocument?.id}
                                                errorView={errorQuittanceGetDocumentById && documentIdToView === transitionData?.coverNoteDocument?.id}
                                                fileDescription={'Document signé ✔'}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FileListItem
                                                fileName={transitionData?.honorDeclarationDocument?.documentTypeLabel}
                                                file={transitionData?.honorDeclarationDocument}
                                                handleDownloadFile={() => {
                                                    (downloadTransitionFile &&
                                                        downloadTransitionFile({ id: transitionData?.honorDeclarationDocument?.id }));
                                                    setDocumentIdToDownload(transitionData?.honorDeclarationDocument?.id);
                                                }}
                                                handleViewFile={() => {
                                                    displayTransitionFile(transitionData?.honorDeclarationDocument?.id);
                                                    setDocumentIdToView(transitionData?.honorDeclarationDocument?.id);
                                                }}
                                                displayFile={transitionData?.honorDeclarationDocument?.contentType.includes('pdf')}
                                                isLoading={isLoadingQuittanceDownloadDocumentById && (documentIdToDownload === transitionData?.honorDeclarationDocument?.id)}
                                                isLoadingView={isLoadingQuittanceGetDocumentById && (documentIdToView === transitionData?.honorDeclarationDocument?.id)}
                                                error={errorQuittanceDownloadDocumentById && documentIdToDownload === transitionData?.honorDeclarationDocument?.id}
                                                errorView={errorQuittanceGetDocumentById && documentIdToView === transitionData?.honorDeclarationDocument?.id}
                                                fileDescription={'Document signé ✔'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                                                                isLoading={isLoadingQuittanceDownloadDocumentById && documentIdToDownload === document?.id}
                                                                isLoadingView={isLoadingQuittanceGetDocumentById && (documentIdToView === document?.id)}
                                                                error={errorQuittanceDownloadDocumentById && documentIdToDownload === document?.id}
                                                                errorView={errorQuittanceGetDocumentById && documentIdToView === document?.id}
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
