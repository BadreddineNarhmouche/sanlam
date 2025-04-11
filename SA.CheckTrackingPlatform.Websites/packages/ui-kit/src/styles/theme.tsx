import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import themeTypography from './themes/typography';
import themePalette from './themes/palette';
import { UI_Typography } from '.';
import colors from './_themes-vars.module.scss';

const typography = UI_Typography;
const color = colors;

const themeOption = {
  colors: color,
  typographies: typography,
};

const themeOptions = {
  palette: themePalette(themeOption),
  typography: themeTypography(themeOption),
};

export const theme = createTheme(themeOptions);

export const ThemeWrapper = ({ children }: any) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);
