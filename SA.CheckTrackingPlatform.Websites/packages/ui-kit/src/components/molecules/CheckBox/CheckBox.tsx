import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';
import React, { memo, useEffect, useRef } from 'react';
import { FormHelperText, Grid, Tooltip, Typography } from '../../atoms';
import {
  boxStyle,
  communStyle,
  containerStyle,
  helperTextStyle,
  selectedBoxStyle,
  titleContainer,
  typoSelectedStyle,
  typographyStyle,
} from '../RadioGroup/styles';

interface Props {
  options?:
    | {
        label: string;
        value: number | string;
        checked?: boolean;
        subInputs?: any;
      }[]
    | []
    | any;
  name: string;
  value: any;
  handleChange: any;
  setFieldValue: any;
  fullwidth?: boolean;
  title?: string;
  withTooltip?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
}

const CheckBoxComponent: React.FC<Props> = ({
  options,
  name,
  value,
  handleChange,
  setFieldValue,
  fullwidth,
  title,
  withTooltip,
  helperText,
  error,
  disabled,
}) => {
  const theme = useTheme();
  const [items, setItems] = React.useState<any[]>(options);
  const prevValueRef = useRef<any>(value);

  useEffect(() => {
    setItems(options);
  }, [options]);

  // this useEffect is used to reset the subInputs of the unselected options
  // in a normal case, the user can unselecte an option by clicking on it (one at the time)
  // but in our case, the checkbox could be a subInput of a RadioGroup. Thus, the user can
  // unselect multiple options by changing the value of the RadioGroup (Parent).
  useEffect(() => {
    // We need to compare the previous value with the current value
    // and here the prevValueRef.current and value are both arrays, so we need to compare theirs items
    // and not the arrays themselves
    if (!compareArrays(prevValueRef.current, value)) {
      const resetSubInputs = (subInputs: any) => {
        if (!subInputs) return;

        subInputs.forEach((subinput: any) => {
          if (subinput.options) {
            subinput.options.forEach((optionSubInput: any) => {
              resetSubInputs(optionSubInput.subInputs);
            });
          }

          setFieldValue(
            subinput.name,
            subinput.rows || subinput.type === 'checkbox' ? [] : '',
          );
        });
      };

      // find the elements that are in the previous value but not in the current value (Unselected elements)
      const unselectedElements = findUniqueElements(
        prevValueRef.current,
        value,
      );

      const filteredOptions = options?.filter(
        (option: any) =>
          value &&
          value !== option.value &&
          option.subInputs &&
          // check if the option is in the unselectedElements array
          // We should reset the subInputs only if the option is unselected
          // which means that the option is in the unselectedElements array
          // @ts-ignore
          unselectedElements.includes(option.value),
      );

      // reset the subInputs of the unselected options
      filteredOptions?.forEach((option: any) => {
        resetSubInputs(option.subInputs);
      });

      // update the prevValueRef with the current value
      prevValueRef.current = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // helper function to compare two arrays and return true if they contains the same elements
  const compareArrays = (array1: [], array2: []) => {
    if (array1.length !== array2.length) {
      return false;
    }

    return array1.every((element) => array2.includes(element));
  };

  // helper function to find unique elements in an array
  const findUniqueElements = (baseArray: [], exclusionArray: []) => {
    return baseArray?.filter((element) => !exclusionArray.includes(element));
  };

  const handleValues = /* istanbul ignore next */ (option: any) => {
    setItems(
      items?.map((item) =>
        item.value === option.value
          ? {
              ...item,
              checked: !option.checked,
            }
          : item,
      ),
    );
    if (!option.checked) {
      setFieldValue(`${name}`, [...value, option.value]);
    } else {
      let checkedValues = [...value];
      checkedValues = checkedValues?.filter((item) => item !== option.value);
      setFieldValue(`${name}`, checkedValues);
    }
  };

  return (
    <Grid container flexDirection={'column'}>
      {title && (
        <Grid item xs={12} style={titleContainer}>
          <Typography variant="subtitle1" mr={1}>
            {title}
          </Typography>
          {withTooltip && (
            <Tooltip title={title}>
              <InfoIcon />
            </Tooltip>
          )}
        </Grid>
      )}
      <Grid sx={containerStyle(theme, fullwidth)}>
        {items?.map((option: any) => (
          <Grid
            item
            key={option.value}
            onChange={handleChange}
            disabled={disabled}
            onClick={/* istanbul ignore next */ () => handleValues(option)}
            {...(option.checked
              ? {
                  sx: {
                    ...communStyle(theme, error, fullwidth),
                    ...selectedBoxStyle,
                  },
                }
              : {
                  sx: {
                    ...boxStyle,
                    ...communStyle(theme, error, fullwidth),
                  },
                })}
          >
            <Typography
              {...(option.checked
                ? {
                    sx: {
                      ...typographyStyle(theme, error),
                      ...typoSelectedStyle,
                    },
                  }
                : {
                    sx: {
                      color: theme.palette.grey[900],
                      ...typographyStyle(theme, error),
                    },
                  })}
            >
              {option.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {error && (
        <Grid item xs={12} style={titleContainer}>
          <FormHelperText style={helperTextStyle} error>
            {helperText}
          </FormHelperText>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(CheckBoxComponent);
