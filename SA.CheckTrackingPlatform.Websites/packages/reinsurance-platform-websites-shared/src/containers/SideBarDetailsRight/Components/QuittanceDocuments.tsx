import { useState, useEffect } from "react";
import { GeneralHelper } from "@reinsurance/helpers";
import { useSelector } from "react-redux";
import SideBarBody from "../SideBarBody";
import SideBarHeader from "../SideBarHeader";
import {
  Grid,
  UploadFiles,
  FileListItem,
  Button,
  Typography,
  Alert,
  Icons,
} from "@reinsurance/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty } from "lodash";
import { RenderByRoles } from "../../RenderByRoles";
import { InternalRoleCodeConstants } from "@reinsurance/helpers/lib/helpers/ConstantsHelper";

type Props = {
  quittanceId: string;
  services: any;
  servicesDeliverySlip: any;
  servicesPayments: any;
  toggleSideBar: any;
  setDialogOpen: any;
  setPDFViewer: React.Dispatch<
    React.SetStateAction<{
      file: string | null;
      fileName: string;
      open: boolean;
    }>
  >;
  displayUpload: boolean;
};

const QuittanceDocuments = ({
  quittanceId,
  services,
  servicesDeliverySlip,
  servicesPayments,
  toggleSideBar,
  setDialogOpen,
  setPDFViewer,
  displayUpload,
}: Props) => {
  const intl = useIntl();

  const {
    responseData: quittanceGetAllDocumentsByCriteria,
    isLoading: isLoadingQuittanceGetAllDocumentsByCriteria,
    error: errorQuittanceGetAllDocumentsByCriteria,
  } = useSelector((state: any) => state.quittanceGetAllDocumentsByCriteria);

  const {
    responseData: quittanceSubmitDocuments,
    isLoading: isLoadingQuittanceSubmitDocuments,
    error: errorQuittanceSubmitDocuments,
  } = useSelector((state: any) => state.quittanceSubmitDocuments);

  const {
    responseData: quittanceGetDocumentById,
    isLoading: isLoadingQuittanceGetDocumentById,
    error: errorQuittanceGetDocumentById,
  } = useSelector((state: any) => state.quittanceGetDocumentById);

  const {
    responseData: deliverySlipGetDocumentById,
    isLoading: isLoadingDeliverySlipGetDocumentById,
    error: errorDeliverySlipGetDocumentById,
  } = useSelector((state: any) => state.deliverySlipGetDocumentById);

  const {
    responseData: quittanceDownloadDocumentById,
    isLoading: isLoadingQuittanceDownloadDocumentById,
    error: errorQuittanceDownloadDocumentById,
  } = useSelector((state: any) => state.quittanceDownloadDocumentById);

  const {
    responseData: deliverySlipDownloadDocumentById,
    isLoading: isLoadingDeliverySlipDownloadDocumentById,
    error: errorDeliverySlipDownloadDocumentById,
  } = useSelector((state: any) => state.deliverySlipDownloadDocumentById);

  const {
    responseData: deliverySlipGetAllDocumentsByCriteria,
    isLoading: isLoadingDeliverySlipGetAllDocumentsByCriteria,
    error: errorDeliverySlipGetAllDocumentsByCriteria,
  } = useSelector((state: any) => state.deliverySlipGetAllDocumentsByCriteria);

  const {
    responseData: paymentGetAllDocumentsByCriteria,
    isLoading: isLoadingPaymentGetAllDocumentsByCriteria,
    error: errorPaymentGetAllDocumentsByCriteria,
  } = useSelector((state: any) => state.paymentGetAllDocumentsByCriteria);

  const {
    responseData: paymentDownloadDocumentById,
    isLoading: isLoadingDPaymentDownloadDocumentById,
    error: errorPaymentDownloadDocumentById,
  } = useSelector((state: any) => state.paymentDownloadDocumentById);

  const {
    responseData: paymentGetDocumentById,
    isLoading: isLoadingPaymentGetDocumentById,
    error: errorPaymentGetDocumentById,
  } = useSelector((state: any) => state.paymentGetDocumentById);

  const [selectedOtherFiles, setSelectedOtherFiles] = useState<File[]>([]);
  const [documentIdToDownload, setDocumentIdToDownload] = useState<
    string | null
  >(null);
  const [documentIdToView, setDocumentIdToView] = useState<string | null>(null);

  const handleSubmit = () => {
    services.submitDocumentsQuittance &&
      services.submitDocumentsQuittance({
        quittanceId,
        documents: selectedOtherFiles,
      });
  };
  useEffect(() => {
    if (quittanceGetAllDocumentsByCriteria) {
      setSelectedOtherFiles([]);
    }
  }, [quittanceGetAllDocumentsByCriteria]);

  const displayTransitionFile = (id: string, from?: string) => {
    if (from === "delivry") {
      servicesDeliverySlip.getDeliverySlipDocumentById &&
        servicesDeliverySlip.getDeliverySlipDocumentById({ id });
    } else if (from === "payemnt") {
      servicesPayments.getPaymentDocumentById &&
        servicesPayments.getPaymentDocumentById({ id });
    } else {
      services.getQuittanceDocumentById &&
        services.getQuittanceDocumentById({ id });
    }
  };

  const downloadTransitionFile = (id: any, from?: string) => {
    if (from === "delivry") {
      servicesDeliverySlip.downloadDeliverySlipDocumentById &&
        servicesDeliverySlip.downloadDeliverySlipDocumentById({ id });
    } else if (from === "payemnt") {
      servicesPayments.downloadPaymentDocumentById &&
        servicesPayments.downloadPaymentDocumentById({ id });
    } else {
      services.downloadQuittanceDocumentById &&
        services.downloadQuittanceDocumentById(id);
    }
  };

  const onDisplayFile = (file: any) => {
    if (file) {
      const url = window.URL.createObjectURL(new Blob([file]));
      setPDFViewer &&
        setPDFViewer((prevState) => ({
          ...prevState,
          file: url,
          fileName: `${file.name}`,
          open: true,
        }));
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    if (quittanceGetDocumentById?.content) {
      const url = window.URL.createObjectURL(
        new Blob([
          GeneralHelper.base64ToUint8Array(quittanceGetDocumentById?.content),
        ])
      );
      setPDFViewer &&
        setPDFViewer((prevState) => ({
          ...prevState,
          file: url,
          fileName: `${quittanceGetDocumentById.name}`,
          open: true,
        }));
      setDialogOpen(true);
      services.clearGetQuittanceDocumentById &&
        services.clearGetQuittanceDocumentById();
      setDocumentIdToView(null);
    }
  }, [quittanceGetDocumentById]);

  useEffect(() => {
    if (deliverySlipGetDocumentById?.content) {
      const url = window.URL.createObjectURL(
        new Blob([
          GeneralHelper.base64ToUint8Array(
            deliverySlipGetDocumentById?.content
          ),
        ])
      );
      setPDFViewer &&
        setPDFViewer((prevState) => ({
          ...prevState,
          file: url,
          fileName: `${deliverySlipGetDocumentById.name}`,
          open: true,
        }));
      setDialogOpen(true);
      servicesDeliverySlip.clearGetDeliverySlipDocumentById &&
        servicesDeliverySlip.clearGetDeliverySlipDocumentById();
      setDocumentIdToView(null);
    }
  }, [deliverySlipGetDocumentById]);

  useEffect(() => {
    if (quittanceDownloadDocumentById?.content) {
      setDocumentIdToDownload(null);
    }
  }, [quittanceDownloadDocumentById]);

  useEffect(() => {
    if (deliverySlipDownloadDocumentById?.content) {
      setDocumentIdToDownload(null);
    }
  }, [deliverySlipDownloadDocumentById]);

  useEffect(() => {
    if (paymentDownloadDocumentById?.content) {
      setDocumentIdToDownload(null);
    }
  }, [paymentDownloadDocumentById]);

  useEffect(() => {
    if (paymentGetDocumentById?.content) {
      const url = window.URL.createObjectURL(
        new Blob([
          GeneralHelper.base64ToUint8Array(paymentGetDocumentById?.content),
        ])
      );
      setPDFViewer &&
        setPDFViewer((prevState) => ({
          ...prevState,
          file: url,
          fileName: `${paymentGetDocumentById.name}`,
          open: true,
        }));
      setDialogOpen(true);
      servicesDeliverySlip.clearGetDeliverySlipDocumentById &&
        servicesDeliverySlip.clearGetDeliverySlipDocumentById();
      setDocumentIdToView(null);
    }
  }, [paymentGetDocumentById]);

  return (
    <>
      <Grid container direction="column" height={"100%"}>
        <SideBarHeader
          toggleSideBar={toggleSideBar}
          titleId={"documents_side_bar.title"}
        />
        <Grid
          item
          xs
          sx={{
            overflow: "auto",
          }}
        >
          <SideBarBody
            isLoading={
              isLoadingQuittanceGetAllDocumentsByCriteria &&
              isLoadingDeliverySlipGetAllDocumentsByCriteria &&
              isLoadingPaymentGetAllDocumentsByCriteria
            }
            isError={
              errorQuittanceGetAllDocumentsByCriteria &&
              errorDeliverySlipGetAllDocumentsByCriteria &&
              errorPaymentGetAllDocumentsByCriteria
            }
            errorAction={() => {}}
            isEmptyData={false}
            canLoadMore={true}
            mainContent={
              <>
                <Grid>
                  <RenderByRoles
                    internalRoleCodes={[
                      InternalRoleCodeConstants.documentConsulting,
                    ]}
                  >
                    <>
                      {quittanceGetAllDocumentsByCriteria?.length > 0 && (
                        <>
                          <Typography
                            variant="body2"
                            color="base.greyMain"
                            p={2}
                            pb={0}
                          >
                            Documents quittance importés
                          </Typography>
                          <Grid
                            item
                            padding={2}
                            sx={
                              displayUpload
                                ? {
                                    height: "calc(100vh - 500px)",
                                    overflow: "auto",
                                  }
                                : null
                            }
                          >
                            <Grid item container spacing={2}>
                              {quittanceGetAllDocumentsByCriteria?.map(
                                (document: any, index: number) => (
                                  <Grid item xs={6} key={index}>
                                    <FileListItem
                                      fileName={document?.name}
                                      handleDownloadFile={() => {
                                        downloadTransitionFile &&
                                          downloadTransitionFile({
                                            id: document?.id,
                                          });
                                        setDocumentIdToDownload(document?.id);
                                      }}
                                      handleViewFile={() => {
                                        displayTransitionFile(document?.id);
                                        setDocumentIdToView(document?.id);
                                      }}
                                      displayFile={document.contentType.includes(
                                        "pdf"
                                      )}
                                      isLoading={
                                        isLoadingQuittanceDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      isLoadingView={
                                        isLoadingQuittanceGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                      error={
                                        errorQuittanceDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      errorView={
                                        errorQuittanceGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                    />
                                  </Grid>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}

                      {/* DelivertySlip */}
                      {deliverySlipGetAllDocumentsByCriteria?.length > 0 && (
                        <>
                          <Typography
                            variant="body2"
                            color="base.greyMain"
                            p={2}
                            pb={0}
                          >
                            Documents bordereau importés
                          </Typography>
                          <Grid
                            item
                            padding={2}
                            sx={
                              displayUpload
                                ? {
                                    height: "calc(100vh - 500px)",
                                    overflow: "auto",
                                  }
                                : null
                            }
                          >
                            <Grid item container spacing={2}>
                              {deliverySlipGetAllDocumentsByCriteria?.map(
                                (document: any, index: number) => (
                                  <Grid item xs={6} key={index}>
                                    <FileListItem
                                      fileName={document?.name}
                                      handleDownloadFile={() => {
                                        downloadTransitionFile &&
                                          downloadTransitionFile(
                                            document?.id,
                                            "delivry"
                                          );
                                        setDocumentIdToDownload(document?.id);
                                      }}
                                      handleViewFile={() => {
                                        displayTransitionFile(
                                          document?.id,
                                          "delivry"
                                        );
                                        setDocumentIdToView(document?.id);
                                      }}
                                      displayFile={document.contentType.includes(
                                        "pdf"
                                      )}
                                      isLoading={
                                        isLoadingDeliverySlipDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      isLoadingView={
                                        isLoadingDeliverySlipGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                      error={
                                        errorDeliverySlipDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      errorView={
                                        errorDeliverySlipGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                    />
                                  </Grid>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}
                      {/* Payments */}
                      {paymentGetAllDocumentsByCriteria?.length > 0 && (
                        <>
                          <Typography
                            variant="body2"
                            color="base.greyMain"
                            p={2}
                            pb={0}
                          >
                            Documents virement importés
                          </Typography>
                          <Grid
                            item
                            padding={2}
                            sx={
                              displayUpload
                                ? {
                                    height: "calc(100vh - 500px)",
                                    overflow: "auto",
                                  }
                                : null
                            }
                          >
                            <Grid item container spacing={2}>
                              {paymentGetAllDocumentsByCriteria?.map(
                                (document: any, index: number) => (
                                  <Grid item xs={6} key={index}>
                                    <FileListItem
                                      fileName={document?.name}
                                      handleDownloadFile={() => {
                                        downloadTransitionFile &&
                                          downloadTransitionFile(
                                            document?.id,
                                            "payemnt"
                                          );
                                        setDocumentIdToDownload(document?.id);
                                      }}
                                      handleViewFile={() => {
                                        displayTransitionFile(
                                          document?.id,
                                          "payemnt"
                                        );
                                        setDocumentIdToView(document?.id);
                                      }}
                                      displayFile={document.contentType.includes(
                                        "pdf"
                                      )}
                                      isLoading={
                                        isLoadingDPaymentDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      isLoadingView={
                                        isLoadingPaymentGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                      error={
                                        errorPaymentDownloadDocumentById &&
                                        documentIdToDownload === document?.id
                                      }
                                      errorView={
                                        errorPaymentGetDocumentById &&
                                        documentIdToView === document?.id
                                      }
                                    />
                                  </Grid>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </>
                  </RenderByRoles>
                  <RenderByRoles
                    internalRoleCodes={[
                      InternalRoleCodeConstants.documentUpload,
                    ]}
                  >
                    <>
                      {displayUpload ? (
                        <Grid item padding={2}>
                          <UploadFiles
                            label="Documents à importer"
                            name={"files"}
                            setFieldValue={(name: string, value: any) =>
                              setSelectedOtherFiles(value)
                            }
                            values={selectedOtherFiles}
                            documentTypes=".pdf,image/png,image/gif,image/jpeg"
                            documentTypesLabel={intl.formatMessage({
                              id: "input.upload.description",
                            })}
                            multipleSelect
                            handleViewFile={(file) => onDisplayFile(file)}
                          />
                        </Grid>
                      ) : null}
                    </>
                  </RenderByRoles>
                </Grid>
              </>
            }
          />
        </Grid>
        <RenderByRoles
          internalRoleCodes={[InternalRoleCodeConstants.documentUpload]}
        >
          <Grid item container sx={{ background: "white" }} p={2}>
            {errorQuittanceSubmitDocuments && (
              <Grid item xs={12} mb={2}>
                <Alert
                  withBoxStyle={true}
                  severity={"error"}
                  icon={<Icons.Error />}
                >
                  <Typography variant="button">
                    <FormattedMessage id={"error.api.title"} />
                  </Typography>
                </Alert>
              </Grid>
            )}
            <Grid item xs={4}></Grid>
            <Grid item xs></Grid>
            {displayUpload ? (
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fontSize={14}
                  fullWidth
                  onClick={handleSubmit}
                  disabled={selectedOtherFiles.length === 0}
                  isLoading={isLoadingQuittanceSubmitDocuments}
                >
                  <Typography variant="body1" fontWeight={500} ml={1}>
                    <FormattedMessage id={"button.upload"} />
                  </Typography>
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </RenderByRoles>
      </Grid>
    </>
  );
};

export default QuittanceDocuments;
