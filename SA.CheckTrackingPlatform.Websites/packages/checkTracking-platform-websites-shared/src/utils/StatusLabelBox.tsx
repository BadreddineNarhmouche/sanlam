import { Box, Chip } from "@checkTracking/ui-kit";
import colors from "../../../ui-kit/src/styles/_themes-vars.module.scss";

const timelineLabelStyles: Record<
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

export const StatusLabelBox = ({
  label,
  sx,
}: {
  label: string;
  sx?: object;
}) => {
  const style = timelineLabelStyles[label] || {
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
