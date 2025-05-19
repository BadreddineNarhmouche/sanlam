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
  statusLabel?: string;
  creationDate?: Date;
  
}

export const Header: React.FC<HeaderProps> = ({ checkNumber, statusLabel }) => {
  const navigate = useNavigate();
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

          {statusLabel && (
            <Chip
              label={statusLabel}
              color="primary"
              variant="outlined"
              sx={{
                ml: 20, // marge à gauche pour l’éloigner
                fontSize: "1rem", // ajustement de la taille si besoin
                borderRadius: 1, // coins arrondis
                borderWidth: 1.5, // trait un peu plus épais
                borderColor: "primary.main",
                color: "primary.main",
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
