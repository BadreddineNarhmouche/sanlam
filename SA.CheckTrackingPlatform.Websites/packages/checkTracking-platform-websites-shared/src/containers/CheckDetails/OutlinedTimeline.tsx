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
import colors from "../../../../ui-kit/src/styles/_themes-vars.module.scss";

export default function HorizontalTimeline({ data }: { data: any }) {
  const Checks = data?.timelines ?? [];

  const dotColors = ["primary", "success", "secondary", "grey"];

  const labelStyles: Record<
    string,
    { color: string; borderColor: string; background: string }
  > = {
    Retour: {
      color: "#ffffff",
      borderColor: colors.TimelineBorderRetour,
      background: colors.TimelineBackGroundRetour,
    },
    Envoie: {
      color: "#ffffff",
      borderColor: colors.TimelineBorderEnvoie,
      background: colors.TimelineBackGroundEnvoie,
    },
    Validation: {
      color: "#ffffff",
      borderColor: colors.TimelineBorderValidation,
      background: colors.TimelineBackGroundValidation,
    },
    EnCours: {
      color: "#ffffff",
      borderColor: colors.TimelineBorderValidation,
      background: colors.TimelineBackGroundValidation,
    },
    RECU: {
      color: "#ffffff",
      borderColor: colors.TimelineBorderValidationForRecu,
      background: colors.TimelineBackGroundValidation,
    },
  };

  return (
    <Box className="timeline-container">
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
                  className="timeline-label"
                  sx={{
                    color: labelStyle.borderColor,
                    textShadow: `0 0 1px ${labelStyle.borderColor}`,
                    backgroundColor: "transparent",
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
