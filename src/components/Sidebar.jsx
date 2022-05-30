import { Drawer,Box, Typography, ListItem,List,ListItemIcon,ListItemButton, ListItemText, Stack } from '@mui/material'
import React from 'react';
import theme, {_} from 'theme';
import {ReactComponent as DocumentIcon} from 'assets/icon-document.svg'
import Button from './Button';
import ModeToggle from './ModeToggle';
import isTouchDevice from 'utils/detectTouchDevice';

function Sidebar(props) {
  const {drawerWidth, open, darkMode, setDarkMode, fileList, loadFile, createNewFile, currFile, headerHeight} = props;
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            border: 'none'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        hideBackdrop
      >
        <Stack sx={{height: '100%'}}>
          <Box>
            <Typography variant='inAppHeadingS' sx={{pl: 3, height: headerHeight, display: 'flex', alignItems: 'center'}}>MY DOCUMENTS</Typography>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', px: 3, pb: 1.5}}>
            <Button aria-label="create new document" sx={{width: 202}} onClick={()=>createNewFile()}><Typography variant="inAppHeadingM">+ New Document</Typography></Button>
          </Box>
          <List 
            sx={{
              p:0,
              flexGrow: 1, 
              overflow: 'auto',
            }}
          >
            {fileList.map(({id,name,dateCreated}, index) => (
              <ListItem key={id} disablePadding >
                <ListItemButton 
                  sx={{
                    p: 0, py: 1.5, px: 3, 
                    ...(!isTouchDevice() && {
                      '&:hover .MuiListItemText-secondary': {color: _.primary.main},
                    }),
                    '&.Mui-selected:hover, &.Mui-selected': {
                      bgcolor: _.clr1000,
                    },
                  }} 
                  onClick={()=>loadFile(id)}
                  selected={currFile.id === id}
                >
                  <ListItemIcon sx={{minWidth: 30}}>
                    <DocumentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={dateCreated} 
                    primaryTypographyProps={{variant: "inAppBodyM"}}
                    secondary={name} 
                    secondaryTypographyProps={{
                      variant: "inAppHeadingM", 
                      noWrap: true
                    }}
                    sx={{m: 0}}
                  />
                  
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{p: 3}}> 
              <ModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
          </Box>
          
        </Stack>
      </Drawer>
    </>
  )
}

export default Sidebar