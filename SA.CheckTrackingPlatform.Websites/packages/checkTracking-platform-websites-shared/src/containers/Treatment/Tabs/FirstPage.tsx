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

  function handleClick() {
    const currentValue = inputElement.current?.value?.trim();
    if (currentValue && currentValue.length > 1) {
      setData((prev) => [...prev, { policyReference: currentValue }]);
      inputElement.current.value = "";
      inputElement.current.focus();
    }
  }

  const handleSubmit = (value: any) => {
    let key = "";
    if (value.policyReference != null) {
      key = "policyReference";
    } else if (value.reference != null) {
      key = "reference";
    }

    setSelect(key);
    handleResetFilter();
    setData((cur) => [...cur, value]);
  };

  const handleQuickAdd = (value: string) => {
    if (value && value.trim().length > 1) {
      setData((prev) => [...prev, { [select]: value.trim() }]);
    }
  };

  const handleResetFilter = () => {
    setFilterValues(initialFilterValues);
  };

  useEffect(() => {}, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentValue = inputElement.current?.value?.trim();
      if (currentValue && currentValue.length > 1) {
        setData((prev) => [...prev, { policyReference: currentValue }]);
        inputElement.current.value = "";
        inputElement.current.focus();
      }
    }
  }

  return (
    <>
      <FormSearch
        resetedValues={filterValues}
        handleSubmit={handleSubmit}
        handleResetFilter={handleResetFilter}
        initialValues={initialFilterValues}
        fieldsToDisplay={FIRST_PAGE_CHECK_FORM_SEARCH_FIELDS([])}
        URLcheckStatusDescriptionID={1}
        isLoading={false}
        keyInput={select}
        onQuickAdd={handleQuickAdd}
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
