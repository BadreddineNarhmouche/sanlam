import { Button, Grid, Table, TextField, Theme } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export const FirstPage = ({
  initialFilterValues,
  handleSubmit,
  handleResetFilter,
}: {
  initialFilterValues?: any;
  handleSubmit?: any;
  handleResetFilter?: any;
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [displayInput, setDisplayInput] = useState(false);
  function handleClick() {
    setDisplayInput((curr) => !curr);
    setTimeout(() => {
      inputElement.current?.focus();
    }, 20);
  }
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
      />
      <Grid
        container
        // justifyContent="flex-end"
        // alignItems="center"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {" "}
        <Grid item>
          {displayInput ? (
            <TextField
              // id={fieldId}
              label={"test"}
              inputRef={inputElement}
            />
          ) : null}
        </Grid>
        <Grid display="flex" flexDirection="row" columnSpacing={1}>
          <Button
            py={2.2}
            fullWidth
            onClick={handleClick}
            type="submit"
            variant="contained"
          >
            {!displayInput ? "Start" : "Valider"}
          </Button>
          {displayInput ? (
            <Button
              ml={1}
              py={2.1}
              fullWidth
              variant="outlined"
              custombackgroundcolor={
                // @ts-ignore
                Theme.theme.palette.base.main
              }
            >
              <FormattedMessage id="action.reset" />
            </Button>
          ) : null}
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
