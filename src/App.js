import React, {useState} from 'react'
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;

  return (
   <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
        <Header open={open} setOpen={setOpen} drawerWidth={drawerWidth}/>
        <Sidebar open={open} setOpen={setOpen} drawerWidth={drawerWidth}/>
      </Box>
    </ThemeProvider>
   </>
  )
}

export default App;
