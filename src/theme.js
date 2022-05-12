import { createTheme } from "@mui/material";

const main = '#ef6643';
const theme = createTheme({
  palette: {
    clr100: '#ffffff',
    clr200: '#f5f5f5',
    clr300: '#e4e4e4',
    clr400: '#c1c4cb',
    clr500: '#7c8187',
    clr600: '#5a6069',
    clr700: '#35393f',
    clr800: '#2b2d31',
    clr900: '#1d1f22',
    clr1000: '#151619',

    primary: {
      main: main,
      light: '#f39765'
    }
  },
  typography: {
    fontFamily: 'Roboto Slab',
    inAppHeadingM: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '15px'
    },
    inAppHeadingS: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '2px'
    },
    inAppBody: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '13px'
    },
    h1: {
      fontWeight: 700,
      fontSize: '32px'
    },
    h2: {
      fontWeight: 300,
      fontSize: '28px'
    },
    h3: {
      fontWeight: 700,
      fontSize: '24px'
    },
    h4: {
      fontWeight: 700,
      fontSize: '20px'
    },
    h5: {
      fontWeight: 700,
      fontSize: '16px'
    },
    h6: {
      fontWeight: 700,
      fontSize: '14px',
      color: main
    },
    body: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    bodyBold: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '24px'
    },
    bodyMono: {
      fontFamily: 'Roboto Mono',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px'
    }
    




  }
})

export default theme;