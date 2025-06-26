import { Box } from "@checkTracking/ui-kit";
import colors from "../../../ui-kit/src/styles/_themes-vars.module.scss";

const timelineLabelStyles: Record<
  string,
  { color: string; borderColor: string; background: string }
> = {
  REM: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderRetour,
    background: colors.TimelineBackGroundRetour,
  },
  EB: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderEnvoie,
    background: colors.TimelineBackGroundEnvoie,
  },
  RB: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderValidation,
    background: colors.TimelineBackGroundValidation,
  },
  EC: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderValidation,
    background: colors.TimelineBackGroundValidation,
  },
  RC: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderValidationForRecu,
    background: colors.TimelineBackGroundValidation,
  },
  RM: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderForRM,
    background: colors.TimelineBackGroundRM,
  },
  RCR: {
    color: "#ffffff",
    borderColor: colors.TimelineBorderForRM,
    background: colors.TimelineBackGroundRM,
  },
};

export const StatusLabelBox = ({
  code,
  label,
  sx,
}: {
  code: string;
  label: string;
  sx?: object;
}) => {
  const style = timelineLabelStyles[code] || {
    color: "#444",
    borderColor: "#ccc",
    background: "transparent",
  };

  return (
    <Box
      component="span"
      className="timeline-label"
      sx={{
        color: style.borderColor,
        textShadow: `0 0 1px ${style.borderColor}`,
        backgroundColor: "transparent",
        fontSize: "0.875rem",
        fontWeight: 600,
        px: 1.5,
        py: 0.5,
        borderRadius: "16px",
        display: "inline-block",
        ...sx,
      }}
    >
      {label}
    </Box>
  );
};
