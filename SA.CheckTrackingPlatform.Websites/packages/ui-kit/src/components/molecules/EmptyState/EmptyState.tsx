import { Grid } from '@mui/material';
import { memo } from 'react';
import { Button, Typography } from '../../atoms';

interface Props {
  image?: any;
  title?: string;
  subTitle: string;
  action?: { label: string; onClick?: () => any; startIcon?: any };
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  imageDelegatedProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const EmptyState = (props: Props) => {
  let direction = props.direction;
  if (!direction) {
    direction = 'column';
  }
  return (
    <Grid
      container
      direction={direction}
      alignItems="center"
      justifyContent="center"
      pb={2}
    >
      {props.image && (
        <Grid item {...{ xs: direction === 'column' }}>
          <img
            src={props.image}
            width={265}
            height={222}
            alt=""
            {...(props.imageDelegatedProps || {})}
          />
        </Grid>
      )}
      {props.title && direction === 'column' && (
        <Grid item xs paddingTop={2}>
          <Typography variant="h6" align="center">
            {props.title}
          </Typography>
        </Grid>
      )}
      {direction === 'column' && (
        <Grid item xs paddingTop={1}>
          <Typography variant="subtitle1" align="center" fontWeight={400}>
            {props.subTitle}
          </Typography>
        </Grid>
      )}
      {direction === 'row' && (
        <Grid item xs paddingTop={2} paddingLeft={4}>
          <Typography variant="h6">{props.title}</Typography>
          <Typography variant="subtitle1" fontWeight={400}>
            {props.subTitle}
          </Typography>
        </Grid>
      )}
      {props.action?.onClick && (
        <Grid item xs paddingTop={2}>
          <Button
            variant="contained"
            {...(props.action.startIcon && {
              startIcon: props.action.startIcon,
            })}
            onClick={props.action.onClick}
            fontSize={14}
            {...(direction === 'row' && {
              style: {
                display: 'flex',
                marginLeft: 'auto',
              },
            })}
          >
            {props.action.label}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(EmptyState);
