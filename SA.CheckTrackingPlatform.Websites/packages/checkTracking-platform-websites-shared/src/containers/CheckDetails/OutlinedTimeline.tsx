import * as React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Typography, Box } from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import "./OutlinedTimeline.css";
import { StatusLabelBox } from "../../utils/StatusLabelBox";

export default function HorizontalTimeline({ data }: { data: any }) {
  const Checks = data?.timelines ?? [];
  const dotColors = ["primary", "success", "secondary", "grey"];

  return (
    <Box className="timeline-container">
      <Timeline position="alternate">
        {Checks.map((check: any, index: number) => {
          const formattedDate = format(
            new Date(check.date),
            "dd/MM/yyyy HH:mm"
          );
          const color = dotColors[index % dotColors.length];
          const label = check.statusItems.code;

          return (
            <TimelineItem
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TimelineSeparator>
                <TimelineDot color={color as any} />
                {index < Checks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "13px", fontWeight: 330 }}
                >
                  {formattedDate} {check.internalUserItem.firstName}{" "}
                  {check.internalUserItem.lastName}
                </Typography>

                <StatusLabelBox label={label} />
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}
