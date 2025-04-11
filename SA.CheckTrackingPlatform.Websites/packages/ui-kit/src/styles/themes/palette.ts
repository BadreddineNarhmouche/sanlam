export default function themePalette(theme: any) {
  return {
    base: {
      main: theme.colors?.baseMain,
      dark: theme.colors?.baseDark,
      light: theme.colors?.baseLight,
      greyLight: theme.colors?.baseGreyLight,
      greyLightBorders: theme.colors?.baseGreyLightBorders,
      baseGreyLightBackground: theme.colors?.baseGreyLightBackground,
      greyMain: theme.colors?.baseGreyMain,
      greyDark: theme.colors?.baseGreyDark,
      orangeMain: theme.colors?.baseOrangeMain,
    },
    primary: {
      main: theme.colors?.primaryMain,
      light: theme.colors?.primaryLight,
      dark: theme.colors?.primaryDark,
      100: theme.colors?.primary100,
    },
    warning: {
      main: theme.colors?.warningMain,
      light: theme.colors?.warningLight,
      dark: theme.colors?.warningDark,
      dark2: theme.colors?.warningDark2,
    },
    success: {
      main: theme.colors?.successDark,
      light: theme.colors?.successLight,
      dark: theme.colors?.successDark,
    },
    error: {
      main: theme.colors?.errorMain,
      light: theme.colors?.errorLight,
      dark: theme.colors?.errorDark,
    },
  };
}
