import React from 'react'
import {CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';

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
    </ThemeProvider>
   </>
  )
}

export default App;
