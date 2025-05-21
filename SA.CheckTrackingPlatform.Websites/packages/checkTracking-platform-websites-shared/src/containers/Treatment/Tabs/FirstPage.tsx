import { Button, Grid, Table } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";

export const FirstPage = ({
  initialFilterValues,
  handleSubmit,
  handleResetFilter,
}: {
  initialFilterValues?: any;
  handleSubmit?: any;
  handleResetFilter?: any;
}) => {
  return (
    <>
      <FormSearch
        resetedValues={initialFilterValues}
        handleSubmit={(values: any) => handleSubmit(values)}
        handleResetFilter={handleResetFilter}
        initialValues={initialFilterValues}
        fieldsToDisplay={FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS([])}
        URLcheckStatusDescriptionID={1}
        isLoading={false}
        // titleForm={""}
      />
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        <Grid item>
          <Button>test</Button>
        </Grid>
      </Grid>
      <Grid>
        <Table
          isCollapsable={true}
          rows={[{ test: "fsd" }]}
          columns={FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT}
          hiddenColumns={FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT}
          // onClickDetailRow={(row: any) => {
          //   navigate(`${detailsPage}?checkId=${row.id}`);
          // }}
          // pagination={{
          //   meta: checksMeta,
          //   handleOnChangePage: (page: number) => handleOnPageChange(page),
          // }}
        />
      </Grid>
    </>
  );
};
