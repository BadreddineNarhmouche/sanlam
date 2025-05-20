import * as React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function HorizontalTimeline({ data }: { data: any }) {
  const Checks = data?.timelines ?? [];

  return (
    <Box>
      {/* En-tête */}
      {Checks.length > 0 && (
        <Typography
          variant="h6"
          sx={{ mb: 3, fontSize: "14px", color: "#0b8dd8", fontWeight: 700 }}
        >
          Timeline du chèque N° : {data.checkNumber} —{" "}
          {format(new Date(Checks[0].date), "dd/MM/yyyy")} —{" "}
          {Checks[0].internalUserItem.firstName}{" "}
          {Checks[0].internalUserItem.lastName}
        </Typography>
      )}

      {/* ✅ Timeline complète, un seul composant */}
      <Timeline
        sx={{
          px: 0,
          "& .MuiTimelineItem-root": {
            minHeight: "auto",
          },
        }}
      >
        {Checks.map((check: any, index: number) => {
          const colorByStatus = {
            Validé: "success",
            Rejeté: "error",
            EnAttente: "warning",
          };

          const color = colorByStatus[check.statusItems.label] || "info";
          const formattedDate = format(
            new Date(check.date),
            "dd/MM/yyyy HH:mm"
          );

          return (
            <TimelineItem key={index}>
              {/* Point + ligne de liaison */}
              <TimelineSeparator>
                <TimelineDot
                  color={color as any}
                  sx={{ width: 8, height: 8 }}
                />
                {index < Checks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              {/* Contenu de l'étape */}
              <TimelineContent>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      minWidth: 280,
                      maxWidth: 400,
                      p: 1.5,
                      borderRadius: 2,
                      borderTop: `1px solid`,
                      borderColor: `${color}.main`,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {/* Ligne nom + date */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "#2c3e50",
                        }}
                      >
                        {formattedDate} {" | "}{" "}
                        {check.internalUserItem.firstName}{" "}
                        {check.internalUserItem.lastName}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Paragraphe explicatif */}
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "11px", color: "#333" }}
                    >
                      {check.internalUserItem.firstName}{" "}
                      {check.internalUserItem.lastName} a modifié le chèque n°{" "}
                      {data.checkNumber} le {formattedDate} avec le statut :{" "}
                      {check.statusItems.label}.
                    </Typography>
                  </Paper>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}
