import { translate } from "@reinsurance/helpers";
import {
  Autocomplete,
  Button,
  DateRange,
  Grid,
  Icons,
  TextField,
  Theme,
  Typography,
  UI_Typography,
} from "@reinsurance/ui-kit";
import { CircularProgress } from "@mui/material";
import { validateYupSchema, withFormik, yupToFormErrors } from "formik";
import { useEffect } from "react";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";
import { FormProps, FormValues } from "./formInterfaces";
import validationsScheme from "./validationsSchema";

const Form = (props: any) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    dirty,
    setFieldValue,
    setValues,
    resetedValues,
    fieldsToDisplay,
    isLoading,
  } = props;

  useEffect(() => {
    resetedValues && setValues(resetedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetedValues]);

  const intl = useIntl();

  const renderTextField = (fieldId: string, fieldLabel: string) => (
    <TextField
      id={fieldId}
      label={translate(fieldLabel, intl)}
      value={values[fieldId]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched[fieldId] ? errors[fieldId] : ""}
      error={touched[fieldId] && Boolean(errors[fieldId])}
    />
  );

  const renderAutocomplete = (
    fieldId: string,
    fieldLabel: string,
    options: any
  ) => (
    <Autocomplete
      id={fieldId}
      options={options}
      defaultValue={options?.find((elm: any) => elm.id === values[fieldId])}
      renderOption={(props: any, option: any) => (
        <li {...props} key={option.id}>
          {option.label || option.name || option}
        </li>
      )}
      onChange={(e: any, value: any) =>
        setFieldValue(fieldId, value ? value.id : "")
      }
      onBlur={handleBlur}
      value={
        values[fieldId]
          ? options?.find((option: any) => option.id === values[fieldId])
          : null
      }
      renderInput={(params: any) => (
        <TextField
          {...params}
          name={fieldId}
          label={translate(fieldLabel, intl)}
          helperText={touched[fieldId] ? errors[fieldId] : ""}
          error={touched[fieldId] && Boolean(errors[fieldId])}
        />
      )}
    />
  );

  const renderDateRange = (fromFieldId: string, toFieldId: string) => (
    <DateRange
      values={values}
      handleChange={handleChange}
      touched={touched}
      errors={errors}
      handleBlur={handleBlur}
      startDate={values[fromFieldId]}
      endDate={values[toFieldId]}
      setStartDate={(value: any) => {
        setFieldValue(fromFieldId, value);
      }}
      setEndDate={(value: any) => {
        setFieldValue(toFieldId, value);
      }}
      fromDateLabel={translate(`quittance.search.${fromFieldId}`, intl)}
      toDateLabel={translate(`quittance.search.${toFieldId}`, intl)}
    />
  );

  const renderDate = (fieldId: string, fieldLabel: string) => (
    <TextField
      id={fieldId}
      label={translate(fieldLabel, intl)}
      InputLabelProps={{
        shrink: true,
      }}
      type="date"
      format={"DD/MM/YYYY"}
      value={values[fieldId]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched[fieldId] ? errors[fieldId] : ""}
      error={touched[fieldId] && Boolean(errors[fieldId])}
    />
  );

  const renderInterval = (fieldId: string, fieldLabel: string) => (
    <TextField
      id={fieldId}
      label={translate(fieldLabel, intl)}
      value={values[fieldId]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched[fieldId] ? errors[fieldId] : ""}
      error={touched[fieldId] && Boolean(errors[fieldId])}
    />
  );

  const renderField = (field: any) => {
    const { fieldId, label, options } = field;
    switch (field.type) {
      case "text":
        return renderTextField(fieldId, label);
      case "select":
        return renderAutocomplete(fieldId, label, options);
      case "date":
        return renderDateRange(
          `from${`${fieldId.charAt(0).toUpperCase()}${fieldId.slice(1)}`}`,
          `to${`${fieldId.charAt(0).toUpperCase()}${fieldId.slice(1)}`}`
        );
      case "datetime":
        return renderDate(fieldId, label);
      case "intervalMin":
        return renderInterval(fieldId, label);
      case "intervalMax":
        return renderInterval(fieldId, label);
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container columnSpacing={2} mb={2} pl={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
            mb={2}
          >
            {intl.formatMessage({ id: "quittance.list.title" })}
          </Typography>
          <Grid display="flex" flexDirection="row" columnSpacing={1}>
            <Grid item>
              <Button
                py={2.2}
                fullWidth
                startIcon={
                  isLoading ? (
                    <CircularProgress size={22} sx={{ mr: 1 }} />
                  ) : (
                    <Icons.Search />
                  )
                }
                type="submit"
                variant="contained"
              >
                <FormattedMessage id="action.search" />
              </Button>
            </Grid>
            <Grid item ml={1}>
              <Button
                py={2.1}
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleReset();
                  props.handleResetFilter();
                }}
                custombackgroundcolor={
                  // @ts-ignore
                  Theme.theme.palette.base.main
                }
                disabled={!dirty || isSubmitting || isLoading}
              >
                <FormattedMessage id="action.reset" />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container columnSpacing={1}>
          {fieldsToDisplay?.map((field: any) => (
            <Grid item xs={field.gridOccupancy} key={field.fieldId}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </form>
  );
};

const FormSearch = withFormik<FormProps, FormValues>({
  mapPropsToValues: ({ initialValues }: any) =>
    /* eslint-disable */
    Object.keys(initialValues).reduce(
      (obj: any, key: string) => ((obj[key] = initialValues[key] || ""), obj),
      {}
    ),
  /* eslint-enable */
  validate: (values: any, props: any) => {
    const schema = validationsScheme({
      ...props,
    });
    try {
      validateYupSchema<any>(values, schema, true);
    } catch (err) {
      return yupToFormErrors(err);
    }
    return {};
  },

  handleSubmit: (values: any, { setSubmitting, props }: any) => {
    setTimeout(() => {
      props.handleSubmit(values);
      setSubmitting(false);
    }, 1000);
  },
})(Form);

export default injectIntl(FormSearch);
