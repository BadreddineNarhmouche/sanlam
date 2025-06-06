import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@checkTracking/ui-kit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { StatusLabelBox } from "../../utils/StatusLabelBox";

interface HeaderProps {
  checkNumber: string;
  timelines?: Array<{
    date: string;
    statusItems: {
      code: string;
      label: string;
    };
  }>;
}

export const Header: React.FC<HeaderProps> = ({ checkNumber, timelines }) => {
  const navigate = useNavigate();

  const lastStatusItem =
    timelines && timelines.length > 0
      ? [...timelines]
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .at(-1)?.statusItems
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
            Chèque N°{checkNumber}
          </Typography>

          {lastStatusItem && (
            <StatusLabelBox
              code={lastStatusItem.code}
              label={lastStatusItem.label}
              sx={{ ml: "50px" }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
