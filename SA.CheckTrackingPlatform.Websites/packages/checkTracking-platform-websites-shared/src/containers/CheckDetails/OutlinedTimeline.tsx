import * as React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { format } from "date-fns";

export default function HorizontalTimeline({ data }: { data: any }) {
  const Checks = data?.timelines ?? [];

  // Couleurs cycliques : primary, success, grey, secondary
  const dotColors = ["primary", "success", "secondary", "grey"];

  return (
    <Timeline position="alternate">
      {Checks.map((check: any, index: number) => {
        const formattedDate = format(new Date(check.date), "dd/MM/yyyy HH:mm");
        const color = dotColors[index % dotColors.length];

        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color={color as any} />
              {index < Checks.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              {/* Ligne 2 : Prénom + Nom */}
              <Typography
                variant="body2"
                sx={{ fontSize: "13px", fontWeight: 330 }}
              >
                {formattedDate} {check.internalUserItem.firstName}{" "}
                {check.internalUserItem.lastName}
              </Typography>

              {/* Ligne 3 : Label du statut */}
              <Typography
                variant="caption"
                sx={{ fontSize: "13px", color: "text.secondary" }}
              >
                {check.statusItems.label}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
