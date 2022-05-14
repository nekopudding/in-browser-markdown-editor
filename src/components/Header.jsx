import { AppBar,Toolbar,IconButton,Typography } from '@mui/material'
import React from 'react'
import menuIcon from 'assets/icon-menu.svg';
import closeIcon from 'assets/icon-close.svg';

function Header(props) {
  const {drawerWidth, open, setOpen} = props;
  return (
   <>
     <AppBar position="fixed" sx={{pl: open ? drawerWidth + "px": 0}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            sx={{ 
              mr: 2,
              borderRadius: 0,
            }}
          >
            {open ? <img src={closeIcon} alt='menu-icon'/> : <img src={menuIcon} alt='menu-icon'/>}
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
   </>
  )
}

export default Header