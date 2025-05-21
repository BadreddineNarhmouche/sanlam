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

export default function HorizontalTimeline({ data }: { data: any }) {
  const Checks = data?.timelines ?? [];

  const dotColors = ["primary", "success", "secondary", "grey"];

  const labelStyles: Record<
    string,
    { color: string; borderColor: string; background: string }
  > = {
    Retour: {
      color: "#ffffff",
      borderColor: "#e53935",
      background: "#d90909",
    },
    Envoie: {
      color: "#ffffff",
      borderColor: "#20c628",
      background: "#18c627",
    },
    Validation: {
      color: "#ffffff",
      borderColor: "#166fbc",
      background: "#0f87d7",
    },
    EnCours: {
      color: "#ffffff",
      borderColor: "#f9a825",
      background: "#f9a825",
    },
    RECU: {
      color: "#ffffff",
      borderColor: "#8e24aa",
      background: "#c76fe0",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        pl: 3,
        borderLeft: "2px solid #3bbce0",
        height: "100%",
      }}
    >
      <Timeline position="alternate">
        {Checks.map((check: any, index: number) => {
          const formattedDate = format(
            new Date(check.date),
            "dd/MM/yyyy HH:mm"
          );
          const color = dotColors[index % dotColors.length];

          const label = check.statusItems.label;
          const labelStyle = labelStyles[label] || {
            color: "text.secondary",
            borderColor: "#bb1717",
            background: "#f5f5f5",
          };

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

                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    mt: 1,
                    px: 1.2,
                    py: 0.5,
                    fontSize: "12px",
                    border: `1px solid ${labelStyle.borderColor}`,
                    borderRadius: "16px",
                    color: labelStyle.color,
                    backgroundColor: labelStyle.background,
                    fontWeight: 500,
                    width: "fit-content",
                  }}
                >
                  {label}
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}
