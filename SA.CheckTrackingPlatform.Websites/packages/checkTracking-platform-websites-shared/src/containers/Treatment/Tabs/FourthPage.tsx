import { Button, Grid, Snackbar, Table } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useEffect, useState } from "react";
import {
  FilterFourthPageTreatment,
  IChecksService,
} from "@checkTracking/helpers";
import { useSelector } from "react-redux";
import { DialogConfirmation } from "../../Dialogs/DialogConfirmation";
import { useIntl } from "react-intl";

export const FourthPage = ({
  services,
  initialFilterValues,
}: {
  services: IChecksService;
  initialFilterValues: FilterFourthPageTreatment;
}) => {
  const intl = useIntl();
  const [select, setSelect] = useState("checkNumber");
  const [data, setData] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<any[]>([]);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [callReset, setCallReset] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);

  const { responseData: getAllChecks } = useSelector(
    (state: any) => state.getAllChecks
  );

  const handleSubmit = (value: any, keyof: string) => {
    setSelect("");
    if (value?.checkNumber != null) {
      setSelect("checkNumber");
    }
    const results = findInArray(firstData, "checkNumber", value?.checkNumber);

    if (
      results.length > 0 &&
      data.find((c) => results.find((d) => c.checkNumber === d.checkNumber)) ===
        undefined
    ) {
      setData((cur) => [...cur, ...results]);
      setCallReset(true);
    } else {
      setDisplayAlert(true);
    }
  };

  function findInArray<T>(array: T[], property: keyof T, value: any): T[] {
    return array.filter((item) => item[property] === value);
  }

  useEffect(() => {
    setFirstData(getAllChecks);
  }, [getAllChecks]);

  const handleResetFilter = () => {
    setData([]);
  };

  function handleClick() {
    setOpenConfiramtionDialog(true);
  }

  useEffect(() => {
    let obj = {
      status: "EC",
    };
    services.getAllChecks && services.getAllChecks(obj);
  }, []);

  const resetFilterDone = () => {
    setCallReset(false);
  };

  const handleSubmitModal = () => {};

  const handleClose = () => {
    setDisplayAlert(false);
  };

  return (
    <>
      <FormSearch
        resetedValues={initialFilterValues}
        handleSubmit={(values: any, keyof: string) =>
          handleSubmit(values, keyof)
        }
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
        severity={"warning"}
        message={"This is a success Alert inside a Snackbar!"}
        handleClose={() => handleClose()}
      />
    </>
  );
};
