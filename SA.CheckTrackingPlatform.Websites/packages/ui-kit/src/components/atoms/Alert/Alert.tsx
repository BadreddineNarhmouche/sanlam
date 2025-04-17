import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Alert from '@mui/material/Alert';
import { memo } from 'react';
import { basicStyle, boxStyle } from './styles';

const AlertComponent = (props: any) => {
  const { withBoxStyle, ...otherProps } = props;

  const renderIcon = () => {
    switch (props.severity) {
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <ReportProblemIcon />;
      case 'info':
        return <InfoIcon />;
      case 'success':
        return <CheckCircleIcon />;
      default:
        return false;
    }
  };

  return (
    <Alert
      {...otherProps}
      icon={renderIcon()}
      {...(props.withBoxStyle
        ? { sx: boxStyle(props.severity) }
        : { sx: basicStyle })}
    >
      {props.children}
    </Alert>
  );
};

export default memo(AlertComponent);
