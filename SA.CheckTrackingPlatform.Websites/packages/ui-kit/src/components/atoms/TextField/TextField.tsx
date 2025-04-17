import { memo, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { GeneralHelper } from "@reinsurance/helpers";
import { styles } from "./styles";

const TextFieldComponent = (props: any) => {
  const isNumber = (variable: any): boolean => {
    return typeof variable === "number" && isFinite(variable);
  };
  const setCalculatedValue = (
    element: any,
    sumOf: Array<string> | { field: string; propertyToSum: string }
  ) => {
    let calculatedValue = 0;

    if (Array.isArray(sumOf)) {
      for (let i = 0; i < sumOf.length; i++) {
        calculatedValue += isNumber(element[sumOf[i]]) ? element[sumOf[i]] : 0;
      }
    } else {
      const elementList = element[sumOf.field];
      for (let i = 0; i < elementList.length; i++) {
        calculatedValue += isNumber(elementList[i][sumOf.propertyToSum])
          ? elementList[i][sumOf.propertyToSum]
          : 0;
      }
    }

    props.setFieldValue(`${props.name}`, calculatedValue);
  };

  useEffect(() => {
    if (props.readOnly && props.sumOf)
      setCalculatedValue(props.values, props.sumOf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.values]);

  const NUMBER_TYPE = "number";
  return (
    <TextField
      margin="dense"
      variant="outlined"
      fullWidth
      {...props}
      sx={props.style ? props.style : styles}
      {...(props.readOnly && {
        InputProps: {
          readOnly: true,
          disabled: true,
        },
      })}
      value={props?.type === NUMBER_TYPE ? props.value : props.value}
      type={props.type}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (props?.type === NUMBER_TYPE) {
          const inputValue = GeneralHelper.parseInputValue(e.target.value);
          if (props.maxValue && inputValue > props.maxValue) {
            return;
          }

          const newValue = inputValue >= 0 ? inputValue : 0;
          const updatedEvent = {
            ...e,
            target: {
              ...e.target,
              value: newValue,
            },
          };

          props?.onChange && props?.onChange(updatedEvent);
          props?.setFieldValue &&
            props?.setFieldValue(`${props.name}`, newValue);
        } else {
          props?.onChange && props?.onChange(e);
          props?.setFieldValue &&
            props?.setFieldValue(`${props.name}`, e.target.value);
        }
      }}
    >
      {props.children}
    </TextField>
  );
};

export default memo(TextFieldComponent);
