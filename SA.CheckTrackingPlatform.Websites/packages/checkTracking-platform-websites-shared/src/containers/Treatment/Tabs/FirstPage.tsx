import {
  Alert,
  Button,
  Grid,
  Icons,
  Snackbar,
  Table,
} from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useEffect, useRef, useState } from "react";
import {
  FilterFirstPageTreatment,
  IChecksService,
} from "@checkTracking/helpers";
import { useSelector } from "react-redux";
import { DialogConfirmation } from "../../Dialogs/DialogConfirmation";
import { useIntl } from "react-intl";

export const FirstPage = ({
  services,
  initialFilterValues,
}: {
  services: IChecksService;
  initialFilterValues: FilterFirstPageTreatment;
}) => {
  const intl = useIntl();
  const [select, setSelect] = useState("reference");
  const [data, setData] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<any[]>([]);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [callReset, setCallReset] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);

  const {
    responseData: getAllChecks,
    isLoading: isLoadingStatusData,
    error: errorStatusData,
  } = useSelector((state: any) => state.getAllChecks);

  const handleSubmit = (value: any) => {
    setSelect("");
    if (value.reference != null) {
      setSelect("reference");
    }
    let dataOp = firstData.find((c) => c.checkNumber === value.reference);
    if (
      dataOp != null &&
      data.find((c) => c.checkNumber === value.reference) == null
    ) {
      setData((cur) => [...cur, dataOp]);
      setCallReset(true);
    } else {
      setDisplayAlert(false);
    }
  };

  useEffect(() => {
    setFirstData(getAllChecks);
  }, [getAllChecks]);

  const handleResetFilter = () => {};

  function handleClick() {
    setOpenConfiramtionDialog(true);
  }

  useEffect(() => {
    let obj = {
      status: "REM",
    };
    services.getAllChecks && services.getAllChecks(obj);
  }, []);

  const resetFilterDone = () => {
    setCallReset(false);
  };

  const handleSubmitModal = () => {};

  return (
    <>
      <FormSearch
        resetedValues={initialFilterValues}
        handleSubmit={(values: any) => handleSubmit(values)}
        handleResetFilter={handleResetFilter}
        callResetFilter={callReset}
        initialValues={initialFilterValues}
        fieldsToDisplay={FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS([])}
        URLcheckStatusDescriptionID={1}
        isLoading={false}
        keyInput={select}
        resetFilterDone={resetFilterDone}
      />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {" "}
        <Grid item></Grid>
        <Grid display="flex" flexDirection="row" columnSpacing={1}>
          <Button
            py={2.2}
            fullWidth
            onClick={handleClick}
            type="submit"
            variant="contained"
          >
            {intl.formatMessage({ id: "button.validate" })}
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <Table
          isCollapsable={true}
          rows={data}
          columns={FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT}
          hiddenColumns={FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT}
        />
      </Grid>
      <DialogConfirmation
        openConfiramtionDialog={openConfiramtionDialog}
        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
        handleSubmit={handleSubmitModal}
        isLoading={false}
        error={false}
        responseData={[]}
      />
      <Snackbar
        open={displayAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={"error"}
        message={"This is a success Alert inside a Snackbar!"}
      />
    </>
  );
};
