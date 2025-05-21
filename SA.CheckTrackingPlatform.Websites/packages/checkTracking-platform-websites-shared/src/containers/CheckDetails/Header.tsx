import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Chip,
} from "@checkTracking/ui-kit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  checkNumber: string;
  timelines?: Array<{
    date: string;
    statusItems: {
      label: string;
    };
  }>;
}
export const Header: React.FC<HeaderProps> = ({ checkNumber, timelines }) => {
  const navigate = useNavigate();

  const lastStatusLabel =
    timelines && timelines.length > 0
      ? [...timelines]
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .at(-1)?.statusItems.label
      : undefined;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="retour"
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            Chèque numéro {checkNumber}
          </Typography>

          {lastStatusLabel && (
            <Chip
              label={lastStatusLabel}
              variant="outlined"
              sx={{
                ml: 30,
                fontSize: "0.875rem",
                borderRadius: 1,
                fontWeight: 600,
                px: 1.5,
                color: "#ffffff",
                borderColor: "#166fbc",
                backgroundColor: "#0f87d7",
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
