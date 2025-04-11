import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

interface Props {
  children: any;
  backgroundColor?: string;
  height?: number;
  minHeight?: number;
  padding?: number;
  mt?: string | number;
  mb?: number;
  mr?: number;
  ml?: number;
  mx?: number;
  my?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
}

const CardContainer = (props: Props) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : // @ts-ignore
            theme.palette.base.main,
        ...(!props.px &&
          !props.py &&
          !props.pt &&
          !props.pb && {
            padding: props.padding ? props.padding : theme.spacing(4),
          }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: `2px solid ${
          props.backgroundColor ? props.backgroundColor : '#EBEEF1'
        }`,
        borderRadius: theme.spacing(1),
        ...(props.height && { height: props.height }),
        ...(props.minHeight && { minHeight: props.minHeight }),
        ...(props.mt && { mt: props.mt }),
        ...(props.mb && { mb: props.mb }),
        ...(props.mr && { mr: props.mr }),
        ...(props.ml && { ml: props.ml }),
        ...(props.mx && { mx: props.mx }),
        ...(props.my && { my: props.my }),
        ...(props.px && { px: props.px }),
        ...(props.py && { py: props.py }),
        ...(props.pt && { pt: props.pt }),
        ...(props.pb && { pb: props.pb }),
        ...(props.pr && { pr: props.pr }),
        ...(props.pl && { pl: props.pl }),
      }}
    >
      {props.children}
    </Paper>
  );
};

export default memo(CardContainer);
