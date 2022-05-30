import { AppBar,Toolbar,IconButton,Typography, Box, Divider, ListItem, ListItemIcon, Input, Stack } from '@mui/material'
import React from 'react'
import {ReactComponent as MenuIcon} from 'assets/icon-menu.svg';
import {ReactComponent as CloseIcon} from 'assets/icon-close.svg';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as DocumentIcon} from 'assets/icon-document.svg'
import {ReactComponent as SaveIcon} from 'assets/icon-save.svg'
import {ReactComponent as DeleteIcon} from 'assets/icon-delete.svg'
import theme, { _ } from 'theme';
import Button from './Button';
import isTouchDevice from 'utils/detectTouchDevice';

function Header(props) {
  const {drawerWidth, open, setOpen, headerHeight, currFile, setCurrFile, saveFile, setDialogOpen, sidebarTransition, windowD} = props;
  
  function handleOpenDialog() {
    if (currFile.id === '-1') return;
    setDialogOpen(true)
  }

  return (
   <>
     <AppBar 
      position="fixed" 
      sx={{
        pl: open ? drawerWidth + "px": 0, 
        bgcolor: _.clr800, boxShadow: 'none',
        ...sidebarTransition('padding')
      }}
    >
        <Toolbar 
          sx={{
            height: headerHeight, 
            p: 0 + " !important",
            display: 'flex'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            sx={{ 
              borderRadius: 0,
              width: headerHeight,
              height: headerHeight,
              bgcolor: _.clr700,
              ...(!isTouchDevice() && {
                "&:hover": { bgcolor: _.primary.main }
              }),
            }}
          >
            {open ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          <Box sx={{ m: 3, display: {mobile: 'none', laptop: 'block'} }}>
            <Logo/>               
          </Box>
          <Divider 
            orientation='vertical' 
            sx={{borderColor: _.clr600, width: '1px', height: '40px', borderWidth: '0 1px 0 0', display: {mobile: 'none', laptop: 'block'} }}
          />
          <Box sx={{display: 'flex', px: 3, alignItems: 'center', flexGrow: 1}}>
            <ListItemIcon sx={{minWidth: 30}}>
              <DocumentIcon />
            </ListItemIcon>
            <Stack sx={{width: {mobile: 'auto', laptop: 400}, mr: 1}}>
              <Typography variant='inAppBodyM' sx={{color: _.clr500, display: {mobile: 'none', tablet:'block'} }}>Document Name</Typography>
              <Input 
                sx={{
                  '&::before': {borderBottom: 'none'},
                  '&::after': {borderBottom: '1px solid '+ _.clr100}
                }}
                inputProps={{ 
                  'aria-label': 'input file name', 
                  sx: {
                    color: _.clr100,
                    ...theme.typography.inAppHeadingM,
                    pt: 0,
                    caretColor: _.primary.main,
                    pb: 0
                  } 
                }}
                onChange={(e)=>setCurrFile((prev) => {
                  return ({...prev, name: e.target.value})
                })}
                value={currFile.name}
              />
            </Stack>
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton 
                  sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    m: 1.5, p:1.5, 
                    borderRadius: '22px',
                    "& *": { fill: _.clr500 },
                    ...(!isTouchDevice() && {
                      "&:hover *": { fill: _.primary.main }
                    }),
                  }}
                  aria-label="delete document"
                  onClick={handleOpenDialog}  
                >
                  <DeleteIcon/>
                </IconButton>
                <Button 
                  sx={{
                    height: '40px', width: {mobile: 40, tablet: 152}, minWidth: 'auto',
                    display: 'flex',alignItems: 'center'
                  }} 
                  aria-label="save changes"
                  onClick={saveFile}
                >
                    <SaveIcon/> 
                    {(windowD.width > theme.breakpoints.values.tablet) && <Typography variant='inAppHeadingM' sx={{ml: 1}}>Save Changes</Typography>}
                </Button>
              </Box>
          </Box>
        </Toolbar>
      </AppBar>
   </>
  )
}

export default Header