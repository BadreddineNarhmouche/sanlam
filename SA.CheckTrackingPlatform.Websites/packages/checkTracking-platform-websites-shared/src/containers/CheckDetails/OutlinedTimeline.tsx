import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

export default function OutlinedTimeline({ Checks }: { Checks: [] }) {
  console.log(Checks);
  return (
    <>
      <Timeline position="alternate">
        {Checks?.map((check: any) => {
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  {check.internalUserItem.firstName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {check.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {check.statusItems.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {check.deed}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/*empty*/}
      </Timeline>
    </>
  );
}
