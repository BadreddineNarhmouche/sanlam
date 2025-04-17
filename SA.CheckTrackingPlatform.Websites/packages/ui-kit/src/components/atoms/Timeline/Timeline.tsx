import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Icons } from '..';

const TimelineComponent = (props: any) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0.5,
        },
      }}
    >
      {props.content?.map((item: any, index: number) => {
        return (
          <TimelineItem key={index}>
            <TimelineSeparator sx={{ pt: '20px', mr: 2 }}>
              {props.emptyIcon ? (
                <TimelineDot
                  color="primary"
                  sx={{ height: '16px', width: '16px' }}
                >
                  <></>
                </TimelineDot>
              ) : (
                <TimelineDot
                  sx={{
                    bgcolor: item.isDone ? '#D4ECFF' : 'primary.main',
                    boxShadow: 'none',
                  }}
                >
                  {item.isDone ?
                    <Icons.Check sx={{ color: '#2E8ED3' }} />
                    : (
                      <Icons.Edit />
                    )}
                </TimelineDot>
              )}
              {index < props.content?.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor: item.isDone ? '#D4ECFF' : 'primary.main',
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px' }}>
              {item.content}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default React.memo(TimelineComponent);
