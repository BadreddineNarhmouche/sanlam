import { Box, Timeline } from '../../atoms';
import { HistoryTimeLineStyle } from './styles';

interface HistoryTimeLineProps {
  content: any;
}

const HistoryTimeLine = ({ content }: HistoryTimeLineProps) => {
  return (
    <Box sx={HistoryTimeLineStyle} pl={3}>
      <Timeline content={content} emptyIcon={true} />
    </Box>
  );
};

export default HistoryTimeLine;
