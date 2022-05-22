import { Drawer,Divider, Box, Typography, ListItem,List,ListItemIcon,ListItemButton, ListItemText, Stack,Switch, FormGroup, FormControlLabel } from '@mui/material'
import React from 'react';
import theme from 'theme';
import {ReactComponent as DocumentIcon} from 'assets/icon-document.svg'
import Button from './Button';
import ModeToggle from './ModeToggle';

function Sidebar(props) {
  const {drawerWidth, open, setOpen, darkMode, setDarkMode, fileList, loadFile} = props;
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: theme.palette.clr900,
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
            height: '82px',
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
            {fileList.map(({id,name,dateCreated}, index) => (
              <ListItem key={id} disablePadding sx={{pl: 3}}>
                <ListItemButton sx={{p: 0, py: 1.5}} onClick={()=>loadFile(id)}>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <DocumentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={dateCreated} 
                    primaryTypographyProps={{variant: "inAppBodyM", sx: {color: theme.palette.clr500}}}
                    secondary={name} 
                    secondaryTypographyProps={{
                      variant: "inAppHeadingM", 
                      sx: {color: theme.palette.clr100, "&:hover":{color: theme.palette.primary.main}}
                    }}
                    sx={{m: 0}}
                  />
                  
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{p: 3,}}>
              <ModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
          </Box>
          
        </Stack>
      </Drawer>
    </>
  )
}

export default Sidebar