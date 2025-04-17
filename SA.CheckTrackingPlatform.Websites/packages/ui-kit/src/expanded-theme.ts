import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    base: Palette['primary'];
  }
  interface PaletteOptions {
    base: PaletteOptions['primary'];
  }
}
