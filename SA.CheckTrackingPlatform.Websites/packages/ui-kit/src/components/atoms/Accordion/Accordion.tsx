import { memo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '../../atoms';
import {
  accordionStyle,
  accordionSummaryStyle,
  accordionDetailStyle,
  typographyStyle,
} from './styles';

interface Props {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  expandedValue: number;
}

const AccordionComponent: React.FC<Props> = ({
  title,
  expandedValue,
  children,
  ...other
}) => {
  const [expanded, setExpanded] = useState<number | false>(0);
  const theme = useTheme();

  /* istanbul ignore next */
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === expandedValue}
      onChange={handleChange(expandedValue)}
      sx={accordionStyle}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />
        }
        sx={accordionSummaryStyle}
      >
        {typeof title === 'string' ? (
          <Typography style={typographyStyle}>{title}</Typography>
        ) : (
          title
        )}
      </AccordionSummary>
      <AccordionDetails sx={accordionDetailStyle}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default memo(AccordionComponent);
