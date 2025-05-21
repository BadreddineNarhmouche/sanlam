import { Grid } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import { FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS } from "../constants";

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
        fieldsToDisplay={FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS([])}
        URLquittanceStatusDescriptionID={1}
        isLoading={false}
      />
      <Grid>test</Grid>
    </>
  );
};
