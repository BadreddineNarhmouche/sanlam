export default function themeTypography(theme: any) {
  return {
    h4: {
      fontSize: '2rem',
      fontWeight: theme.typographies.FONT_WEIGHT_SEMI_BOLD,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: theme.typographies.FONT_WEIGHT_LIGHT,
    },
    h7: {
      fontSize: '1.125rem',
      fontWeight: theme.typographies.FONT_WEIGHT_SEMI_BOLD,
    },
    subtitle: {
      fontWeight: theme.typographies.FONT_WEIGHT_NORMAL,
    },
    subtitle2: {
      fontWeight: theme.typographies.FONT_WEIGHT_NORMAL,
    },
    caption: {
      lineHeight: '2rem',
      letterSpacing: '0.031rem',
    },
    subtitle1: {
      fontWeight: theme.typographies.FONT_WEIGHT_MEDIUM,
    },
  };
}
