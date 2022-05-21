import { createTheme } from "@mui/material";

const _ = {
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

    background: {
      default: '#ffffff'
    },
    primary: {
      main: '#ef6643',
      light: '#f39765'
    }
  }
}

const theme = createTheme({
  mode: 'dark',
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

    background: {
      default: '#ffffff'
    },
    primary: {
      main: _.palette.primary.main,
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
      fontWeight: 500,
      fontSize: '14px',
      letterSpacing: '2px'
    },
    inAppBodyM: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '13px'
    },
    h1: {
      fontWeight: 700,
      fontSize: '32px',
      color: _.palette.clr700,
      my: 2.5
    },
    h2: {
      fontWeight: 300,
      fontSize: '28px',
      color: _.palette.clr700,
      my: 2.5
    },
    h3: {
      fontWeight: 700,
      fontSize: '24px',
      color: _.palette.clr700,
      my: 2.5
    },
    h4: {
      fontWeight: 700,
      fontSize: '20px',
      color: _.palette.clr700,
      my: 2.5
    },
    h5: {
      fontWeight: 700,
      fontSize: '16px',
      color: _.palette.clr700,
      my: 2.5
    },
    h6: {
      fontWeight: 700,
      fontSize: '14px',
      color: _.palette.primary.main,
      lineHeight: 1,
      my: 2.5
    },
    body: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px',
      color: _.palette.clr500
    },
    bodyBold: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '24px',
      color: _.palette.clr700
    },
    code: {
      fontFamily: 'Roboto Mono',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px',
      color: _.palette.clr700
    }
  }
})

export default theme;