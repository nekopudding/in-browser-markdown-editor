import React from 'react'
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';
import Button from 'components/Button';
import Toggle from 'components/Toggle';

function App() {
  return (
   <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Typography variant="inAppHeadingM">In App Heading M</Typography>
      <Typography variant='h1'>H1</Typography>
      <Typography variant='h2'>H1</Typography>
      <Typography variant='h3'>H1</Typography>
      <Typography variant='h4'>H1</Typography>
      <Typography variant='h5'>H1</Typography>
      <Typography variant='h6'>H1</Typography>
      <Typography variant='bodyMono'>Body Mono asdjfklsda</Typography>
      <Button>Save Changes</Button>
      <Box sx={{bgcolor: theme.palette.clr900}}>
        <Toggle/>
      </Box>

    </ThemeProvider>
   </>
  )
}

export default App;
