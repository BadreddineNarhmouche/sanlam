import React, { memo, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Typography, Tooltip, FormHelperText } from '../../atoms';
import {
  boxStyle,
  selectedBoxStyle,
  communStyle,
  typographyStyle,
  typoSelectedStyle,
  containerStyle,
  titleContainer,
  helperTextStyle,
} from './styles';
import { UI_Typography } from '../../../styles';

interface Props {
  options?:
    | {
        label: string;
        value: number | string;
        checked?: boolean;
        subInputs?: any;
        code?: string;
      }[]
    | [];
  value: number | string;
  handleChange?: any;
  fullwidth?: boolean;
  title?: string;
  subTitle?: any;
  withTooltip?: boolean;
  helperText?: string;
  error?: boolean;
  setFieldValue?: any;
  name: string;
  handleChangeCode?: any;
  disabled?: boolean;
  gridOccupancy?: any;
}

const RadioGroupComponent: React.FC<Props> = ({
  options,
  value,
  handleChange,
  handleChangeCode,
  fullwidth,
  title,
  subTitle,
  withTooltip,
  helperText,
  error,
  setFieldValue,
  name,
  disabled,
  gridOccupancy,
}) => {
  const theme = useTheme();
  const [radioValue, setRadioValue] = React.useState<any>(value);
  // this ref is used to compare the previous value with the current value if the user changed
  // the form (Tab) and then came back to the same form
  const prevValueRef = useRef<any>(value);

  // this useEffect is used to reset the subInputs of the unselected options
  useEffect(() => {
    // so we need to compare the previous value with the current value
    // It should be get executed if the values had changed, and not on the first render (if the
    // user navigate between tabs/forms)
    if (prevValueRef.current !== radioValue) {
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

      const filteredOptions = options?.filter(
        (option: any) =>
          radioValue && radioValue !== option.value && option.subInputs,
      );

      // reset the subInputs of the unselected options
      filteredOptions?.forEach((option: any) => {
        resetSubInputs(option.subInputs);
      });

      // update the prevValueRef with the current value
      prevValueRef.current = radioValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  return (
    <Grid container flexDirection={'column'}>
      {title && (
        <Grid item xs={12} style={titleContainer}>
          <Typography variant="subtitle1" mr={1}>
            {title}
          </Typography>
          {withTooltip && (
            <Tooltip title={'test'}>
              <InfoIcon />
            </Tooltip>
          )}
        </Grid>
      )}
      {subTitle && (
        <Grid item xs={12}>
          <Typography
            variant="button"
            fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
            mr={1}
          >
            {subTitle}
          </Typography>
        </Grid>
      )}
      <Grid sx={containerStyle(theme, fullwidth)}>
        {options?.map((option) => (
          <Grid
            item
            {...(gridOccupancy && { xs: gridOccupancy })}
            key={option.value}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setRadioValue(option.value);
                setFieldValue
                  ? setFieldValue(name, option.value)
                  : handleChange(option.value);
                handleChangeCode && handleChangeCode(option.code);
              }
            }}
            {...(value === option.value
              ? {
                  sx: {
                    ...communStyle(theme, error, fullwidth),
                    ...selectedBoxStyle,
                    ...(disabled && {
                      backgroundColor: '#EBEEF1',
                      borderColor: 'base.greyLightBorders',
                    }),
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
              {...(value === option.value
                ? {
                    sx: {
                      ...typographyStyle(theme, error),
                      ...typoSelectedStyle,
                      ...(disabled && { color: '#A0A8B2' }),
                    },
                  }
                : {
                    sx: {
                      ...typographyStyle(theme, error),
                      color: disabled ? '#A0A8B2' : theme.palette.grey[900],
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

export default memo(RadioGroupComponent);
