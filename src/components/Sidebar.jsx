import { Drawer,Divider, Box, Typography, ListItem,List,ListItemIcon,ListItemButton, ListItemText, Stack,Switch, FormGroup, FormControlLabel } from '@mui/material'
import React from 'react';
import theme from 'theme';
import documentIcon from 'assets/icon-document.svg'
import Button from './Button';
import Toggle from './Toggle';
import lightIcon from 'assets/icon-light-mode.svg'
import darkIcon from 'assets/icon-dark-mode.svg'

function Sidebar(props) {
  const {drawerWidth, open, setOpen} = props;
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.clr900
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
          }}
        >
          <Typography variant='inAppHeadingS' sx={{color: theme.palette.clr500}}>MY DOCUMENTS</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', pb: 1.5}}>
          <Button sx={{width: 202}}><Typography variant="inAppHeadingM">+ New Document</Typography></Button>
        </Box>
        <Stack sx={{height: '100%'}}>
          <List 
            sx={{
              p:0,
              flexGrow: 1, 
              overflow: 'auto'
            }}
          >
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{pl: 3, py: 1.5}}>
                <ListItemButton sx={{p: 0}}>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <img src={documentIcon} alt='document icon'/>
                  </ListItemIcon>
                  <ListItemText 
                    primary={"01 April 2022"} 
                    primaryTypographyProps={{variant: "inAppBodyM", sx: {color: theme.palette.clr500}}}
                    secondary={text} 
                    secondaryTypographyProps={{variant: "inAppHeadingM", sx: {color: theme.palette.clr100}}}
                    sx={{m: 0}}
                  />
                  
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{p: 3,}}>
            <Box sx={{ width: 104 }}>
              <img src={lightIcon} alt='light mode'/>
              <Switch 
                sx={{
                  p: 0, 
                  height: 24,
                  borderRadius: '12px',
                  "& .MuiSwitch-switchBase": {
                    p: 0
                  },
                  "& .Mui-checked": {
                    transform: 'translateX(24px)'
                  },
                  "& .MuiSwitch-thumb": {
                    width: '12px',
                    height: '12px'
                  }
                }}
              />
              <img src={darkIcon} alt='dark mode'/>
            </Box>
          </Box>
          
        </Stack>
      </Drawer>
    </>
  )
}

export default Sidebar