import { Button, Grid, Table, TextField, Theme } from "@checkTracking/ui-kit";
import FormSearch from "../FormSearch/FormSearch";
import {
  FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS,
  FIRST_PAGE_CHECK_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_CHECK_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "../constants";
import { useEffect, useRef, useState } from "react";

export const FirstPage = ({
  initialFilterValues,
}: {
  initialFilterValues?: any;
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [displayInput, setDisplayInput] = useState(false);
  const [select, setSelect] = useState("policyReference");
  const [data, setData] = useState<any[]>([]);
  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);

  const handleSubmit = (value: any) => {
    console.log(value);
    setSelect("");
    if (value.policyReference != null) {
      console.log("first");
      setSelect("policyReference");
    } else if (value.reference != null) {
      setSelect("reference");
    }
    handleResetFilter();
    setData((cur) => [...cur, value]);
    console.log(select);
  };

  const handleResetFilter = () => {
    setFilterValues(initialFilterValues);
  };

  function handleClick() {
  }

  useEffect(() => {}, []);

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
        // justifyContent="flex-end"
        // alignItems="center"
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
            {!displayInput ? "Start" : "Valider"}
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
    </>
  );
};
