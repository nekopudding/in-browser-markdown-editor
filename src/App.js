import React, {useState} from 'react'
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';
import Button from 'components/Button';
import ModeToggle from 'components/ModeToggle';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Editor from 'components/Editor';

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const drawerWidth = 240;
  const headerHeight = 72;
  const commonProps = {
    darkMode: darkMode
  }

  return (
   <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
        <Header open={open} setOpen={setOpen} drawerWidth={drawerWidth} headerHeight={headerHeight}/> 
        <Sidebar 
          open={open} 
          setOpen={setOpen} 
          drawerWidth={drawerWidth} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
        />
        <Editor headerHeight={headerHeight} open={open} drawerWidth={drawerWidth}/>
      </Box>
    </ThemeProvider>
   </>
  )
}

export default App;
