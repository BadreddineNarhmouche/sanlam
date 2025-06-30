import {
  Button,
  CardContainer,
  EmptyState,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  Table,
} from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useEffect, useState } from "react";
import {
  FilterFirstPageTreatment,
  IChecksService,
} from "@checkTracking/helpers";
import { useSelector } from "react-redux";
import { DialogConfirmation } from "../../Dialogs/DialogConfirmation";
import { useIntl } from "react-intl";
import {
  FIELDS_PAGE_TREATMENT,
  STATUS_TREATMENTS,
} from "../../../constants/global";
import { DialogTreatment } from "../../Dialogs/DialogTreatment";
import { IReasonMoveService } from "@checkTracking/helpers/lib/api/types/service";

export const FirstPage = ({
  services,
  initialFilterValues,
  status,
  handleSubmitData,
  reasonMoveService,
}: {
  services: IChecksService;
  initialFilterValues: FilterFirstPageTreatment;
  status: string;
  handleSubmitData: (
    dataTable: any[],
    Select?: any,
    Comment?: any,
    statusNow?: any
  ) => any;
  reasonMoveService: IReasonMoveService;
}) => {
  const intl = useIntl();
  const [select, setSelect] = useState("checkNumber");
  const [data, setData] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<any[]>([]);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [callReset, setCallReset] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);

  const {
    responseData: getAllChecks,
    isLoading: isLoadingData,
    error: errorData,
  } = useSelector((state: any) => state.getAllChecks);

  const {
    responseData: TimelineUpdate,
    isLoading: isLoadingTimeLineUpdate,
    error: errorTimeLineUpdate,
  } = useSelector((state: any) => state.TimelineUpdate);

  /* useEffect(() => {
    if (TimelineUpdate.isSuccess) {
      setData([]);
    }
  }, [TimelineUpdate]); */

  useEffect(() => {
    if (TimelineUpdate?.isSuccess) {
      setData([]);
    }
  }, [TimelineUpdate]);

  const handleSubmit = (value: any, keyof: string) => {
    setSelect("");
    if (value?.checkNumber != null) {
      setSelect("checkNumber");
    }
    const resultsToDisplay: any[] = [];
    for (let index = 0; index < FIELDS_PAGE_TREATMENT.length; index++) {
      resultsToDisplay.push(
        ...findInArray(firstData, FIELDS_PAGE_TREATMENT[index], value)
      );
    }
    if (
      resultsToDisplay.length > 0 &&
      data.find((c) =>
        resultsToDisplay.find((d) => c.checkNumber === d.checkNumber)
      ) === undefined
    ) {
      setData((cur) => [...cur, ...resultsToDisplay]);
      setCallReset(true);
    } else {
      setDisplayAlert(true);
    }
  };

  function findInArray<T>(array: T[], property: keyof T, value: any): T[] {
    return array.filter((item) => item[property] === value[property]);
  }

  useEffect(() => {
    setFirstData(getAllChecks);
  }, [getAllChecks]);

  useEffect(() => {
    if (status === STATUS_TREATMENTS.ClientIn) {
      reasonMoveService.AllReasonMoves &&
        reasonMoveService.AllReasonMoves("MR");
    } else if (status === STATUS_TREATMENTS.ClientOut) {
      reasonMoveService.AllReasonMoves &&
        reasonMoveService.AllReasonMoves("MT");
    }
  }, []);

  const handleResetFilter = () => {
    setData([]);
  };

  function handleClick() {
    if (
      status === STATUS_TREATMENTS.ClientOut ||
      status === STATUS_TREATMENTS.ClientIn
    ) {
      setOpenTreatmentDialog(true);
    } else setOpenConfiramtionDialog(true);
  }

  useEffect(() => {
    services.getAllChecks &&
      services.getAllChecks({
        status: status,
      });
  }, []);

  const resetFilterDone = () => {
    setCallReset(false);
  };

  const handleSubmitModal = () => {
    handleSubmitData(data, null, null, status);
  };

  const handleSubmitModalTreatment = (Select?: any, Comment?: any) => {
    handleSubmitData(data, Select, Comment, status);
  };

  const handleClose = () => {
    setDisplayAlert(false);
  };

  return (
    <>
      {isLoadingData ? (
        <Stack spacing={2} mt={3}>
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
        </Stack>
      ) : errorData ? (
        <CardContainer mt={3}>
          <EmptyState
            title={intl.formatMessage({
              id: "error.api.title",
            })}
            subTitle={intl.formatMessage({
              id: "error.api.subTitle",
            })}
          />
        </CardContainer>
      ) : (
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
                disabled={data.length > 0 ? false : true}
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
            isLoading={isLoadingTimeLineUpdate}
            error={errorTimeLineUpdate}
            responseData={TimelineUpdate}
          />
          <Snackbar
            open={displayAlert}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            severity={"warning"}
            message={"This is a success Alert inside a Snackbar!"}
            handleClose={() => handleClose()}
          />
          <DialogTreatment
            openConfiramtionDialog={openTreatmentDialog}
            setOpenConfiramtionDialog={setOpenTreatmentDialog}
            handleSubmit={(Select?: any, Comment?: any) =>
              handleSubmitModalTreatment(Select, Comment)
            }
            isLoading={isLoadingTimeLineUpdate}
            error={errorTimeLineUpdate}
            responseData={TimelineUpdate}
          />
        </>
      )}
    </>
  );
};
