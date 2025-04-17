import { GeneralHelper, IQuittanceDetailsService } from '@reinsurance/helpers';
import {
    Accordion,
    Button,
    FileListItem,
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

export const SubscriptionValidation = ({
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
    services: IQuittanceDetailsService;
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
        responseData: quittanceValidateSubscription,
        isLoading: isLoadingQuittanceValidateSubscription,
        error: errorQuittanceValidateSubscription } = useSelector(
            (state: any) => state.quittanceValidateSubscription,
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

    const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
    const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

    const [documentIdToDownload, setDocumentIdToDownload] = useState<string | null>(null);
    const [documentIdToView, setDocumentIdToView] = useState<string | null>(null);

    const handleSubmit = () => {
        services.validateSubscriptionQuittance &&
            services.validateSubscriptionQuittance({
                externalTimelineHistoryId: currentTimelineId,
                externalNextTransitionId: nextTransitions[0]?.id,
                quittanceId: demand.id,
                comment: comment
            });
    }

    const displayTransitionFile = (id: string) => {
        services.getQuittanceDocumentById && services.getQuittanceDocumentById({ id });
    };

    useEffect(() => {
        if (quittanceGetDocumentById?.content) {
            const url = window.URL.createObjectURL(new Blob([GeneralHelper.base64ToUint8Array(quittanceGetDocumentById?.content)]));
            setPDFViewer && setPDFViewer({ file: url, fileName: `${quittanceGetDocumentById.name}`, open: true });
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
                                        Documents à Afficher
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
                        isLoading={isLoadingQuittanceValidateSubscription}
                        error={errorQuittanceValidateSubscription}
                        responseData={quittanceValidateSubscription}
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
