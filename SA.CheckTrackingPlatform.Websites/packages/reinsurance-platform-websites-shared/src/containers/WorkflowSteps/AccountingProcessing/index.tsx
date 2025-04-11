import { IPaymentService } from "@reinsurance/helpers";
import {
  Button,
  Grid,
  Typography,
  UI_Typography,
  UploadFiles,
  TextField,
} from "@reinsurance/ui-kit";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { DialogConfirmation } from "../DialogConfirmation";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const AccountingProcessing = ({
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
  services: IPaymentService;
  publicContentDone?: string;
  transitionData?: any;
  demand?: any;
  downloadTransitionFile?: (payload: any) => void;
  setDialogOpen?: any;
  setPDFViewer?: React.Dispatch<
    React.SetStateAction<{
      file: string | null;
      fileName: string;
      open: boolean;
    }>
  >;
}) => {
  const intl = useIntl();

  const [amount, setAmount] = useState<string>();
  const navigate = useNavigate();

  const {
    responseData: PaymentsValidate,
    isLoading: isLoadingPaymentsValidate,
    error: errorPaymentsValidate,
  } = useSelector((state: any) => state.PaymentsValidate);

  useEffect(() => {
    if (PaymentsValidate?.isSuccess) {
      services.clearPaymentValidate && services.clearPaymentValidate();
      navigate(`${"/"}?tab=${1}`);
    }
  }, [PaymentsValidate?.isSuccess]);

  const [selectedOtherFiles, setSelectedOtherFiles] = useState<File[]>([]);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);

  const handleSubmit = () => {
    const number = amount ? amount?.toString().replace(".", ",") : "";
    services.ValidatePayment &&
      services.ValidatePayment({
        paymentId: demand.id,
        documents: selectedOtherFiles,
        amountExecuted: number ?? null,
      });
  };

  const onDisplayFile = (file: any, documentTypeCode?: string) => {
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

  return (
    <>
      <>
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
            border: "1px solid #EBEEF1",
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
              <Typography
                variant="subtitle1"
                fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                color="#0075C9"
                fontSize={14}
              >
                {moment(new Date()).format("DD MMMM yyyy à HH:mm")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
              >
                Chargement doc avis de débit reçu
              </Typography>
              <UploadFiles
                name={"files"}
                setFieldValue={(name: string, value: any) => {
                  setSelectedOtherFiles(value);
                }}
                values={selectedOtherFiles}
                label={" "}
                documentTypes=".pdf,image/png,image/gif,image/jpeg"
                documentTypesLabel={intl.formatMessage({
                  id: "input.upload.description",
                })}
                multipleSelect
                handleViewFile={(file) => onDisplayFile(file)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Montant à éxecuté"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAmount(event.target.value);
                }}
                name="amount"
                id="formatted-amount-input"
                variant="outlined"
                type="number"
              />
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs></Grid>
              <Grid item xs style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  fontSize={14}
                  onClick={() => setOpenConfiramtionDialog(true)}
                  disabled={!(selectedOtherFiles.length > 0 && amount)}
                >
                  <Typography variant="body1" fontWeight={500} ml={1}>
                    <FormattedMessage id={"payment.button.regler"} />
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogConfirmation
          openConfiramtionDialog={openConfiramtionDialog}
          setOpenConfiramtionDialog={setOpenConfiramtionDialog}
          handleSubmit={handleSubmit}
          isLoading={isLoadingPaymentsValidate}
          error={errorPaymentsValidate}
          responseData={PaymentsValidate}
        />
      </>
    </>
  );
};
