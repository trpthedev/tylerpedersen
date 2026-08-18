import { createTheme } from '@mui/material/styles'

const ink = '#0f172a'
const inkSoft = '#334155'
const slate = '#64748b'
const line = '#d5dae6'
const chip = '#e6ebf5'

const bodyFont = "'Sora', sans-serif"
const headingFont = "'Space Grotesk', sans-serif"

export const theme = createTheme({
  breakpoints: {
    // md is pinned to 840 because the layout's single-column breakpoint was
    // authored against a 840px media query.
    values: { xs: 0, sm: 600, md: 840, lg: 1200, xl: 1536 },
  },
  palette: {
    primary: { main: '#4f46e5' },
    text: { primary: ink, secondary: inkSoft, disabled: slate },
    divider: line,
    success: { main: '#15803d' },
    error: { main: '#b91c1c' },
  },
  typography: {
    fontFamily: bodyFont,
    fontWeightRegular: 400,
    // fontWeight is explicit because MUI defaults h1/h2 to 300, and the only
    // Space Grotesk weights loaded in index.css are 500 and 700.
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: 'clamp(2rem, 5vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      margin: 0,
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: '1.1rem',
      letterSpacing: '-0.02em',
      // MUI's h2 default is 1.2; the old CSS inherited 1.6 from :root.
      lineHeight: 1.6,
    },
    body1: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: ink,
          lineHeight: 1.6,
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          background: [
            'radial-gradient(circle at 10% 20%, rgba(125, 211, 252, 0.35), transparent 35%)',
            'radial-gradient(circle at 90% 10%, rgba(167, 139, 250, 0.26), transparent 30%)',
            'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
          ].join(', '),
        },
        '#root': { minHeight: '100svh' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        // The section-card look. Padding and spacing live here so call sites
        // are a bare <Paper variant="outlined">.
        outlined: {
          background:
            'linear-gradient(140deg, rgba(255, 255, 255, 0.65), rgba(247, 248, 252, 0.65))',
          borderColor: line,
          backdropFilter: 'blur(4px)',
          padding: 24,
          marginTop: 16,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: { marginBottom: 14 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          background: chip,
          border: `1px solid ${line}`,
          fontSize: '0.85rem',
          fontWeight: 600,
          height: 'auto',
          padding: '7px 12px',
        },
        label: { padding: 0 },
      },
    },
  },
})

// The pill-shaped links used in the link rows on both pages.
export const pillLinkSx = {
  textTransform: 'none',
  color: 'text.primary',
  background: '#ffffff',
  border: `1px solid ${line}`,
  borderRadius: '10px',
  padding: '8px 12px',
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.6,
  minWidth: 0,
  transition: 'transform 120ms ease, box-shadow 120ms ease',
  '&:hover': {
    background: '#ffffff',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
  },
} as const
