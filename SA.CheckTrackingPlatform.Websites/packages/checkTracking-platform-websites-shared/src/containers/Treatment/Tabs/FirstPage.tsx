import { Alert, Button, Grid, Table } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useEffect, useRef, useState } from "react";
import { IChecksService } from "@checkTracking/helpers";
import { useSelector } from "react-redux";
import { DialogConfirmation } from "../../Dialogs/DialogConfirmation";

export const FirstPage = ({
  services,
  initialFilterValues,
}: {
  services: IChecksService;
  initialFilterValues?: any;
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [displayInput, setDisplayInput] = useState(false);
  const [select, setSelect] = useState("policyReference");
  const [data, setData] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<any[]>([]);
  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);

  const {
    responseData: getAllChecks,
    isLoading: isLoadingStatusData,
    error: errorStatusData,
  } = useSelector((state: any) => state.getAllChecks);

  const handleSubmit = (value: any) => {
    setSelect("");
    if (value.policyReference != null) {
      setSelect("policyReference");
    } else if (value.reference != null) {
      setSelect("reference");
    }
    handleResetFilter();
    let dataOp = firstData.find((c) => c.checkNumber === value.policyReference);
    if (
      dataOp != null &&
      data.find((c) => c.checkNumber === value.policyReference) == null
    )
      setData((cur) => [...cur, dataOp]);
    else {
      console.log("first");
      return <Alert severity={"info"} />;
    }
  };

  useEffect(() => {
    setFirstData(getAllChecks);
  }, [getAllChecks]);

  const handleResetFilter = () => {
    setFilterValues(initialFilterValues);
  };

  function handleClick() {
    setOpenConfiramtionDialog(true);
  }

  useEffect(() => {
    let obj = {
      status: "REM",
    };
    services.getAllChecks && services.getAllChecks(obj);
  }, []);

  const handleSubmitModal = () => {};

  return (
    <>
      <FormSearch
        resetedValues={filterValues}
        handleSubmit={(values: any) => handleSubmit(values)}
        handleResetFilter={handleResetFilter}
        initialValues={initialFilterValues}
        fieldsToDisplay={FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS([])}
        URLcheckStatusDescriptionID={1}
        isLoading={false}
        keyInput={select}
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
            Valider
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
    </>
  );
};
