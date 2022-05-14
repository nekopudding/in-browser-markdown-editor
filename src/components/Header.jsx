import { AppBar,Toolbar,IconButton,Typography, Box, Divider } from '@mui/material'
import React from 'react'
import {ReactComponent as MenuIcon} from 'assets/icon-menu.svg';
import {ReactComponent as CloseIcon} from 'assets/icon-close.svg';
import {ReactComponent as Logo} from 'assets/logo.svg';
import theme from 'theme';

function Header(props) {
  const {drawerWidth, open, setOpen} = props;
  return (
   <>
     <AppBar position="fixed" sx={{pl: open ? drawerWidth + "px": 0, bgcolor: theme.palette.clr800}}>
        <Toolbar 
          sx={{
            height: '72px', 
            p: 0 + " !important",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            sx={{ 
              borderRadius: 0,
              width: '72px',
              height: '72px',
              bgcolor: theme.palette.clr700
            }}
          >
            {open ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          <Box sx={{ m: 3 }}>
            <Logo/>               
          </Box>
          <Divider orientation='vertical' sx={{borderColor: theme.palette.clr600, width: '1px', height: '40px', borderWidth: '1px'}}/>
          <Typography variant="h4" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
   </>
  )
}

export default Header