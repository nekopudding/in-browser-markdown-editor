import { AppBar,Toolbar,IconButton,Typography, Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Input, Stack } from '@mui/material'
import React from 'react'
import {ReactComponent as MenuIcon} from 'assets/icon-menu.svg';
import {ReactComponent as CloseIcon} from 'assets/icon-close.svg';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as DocumentIcon} from 'assets/icon-document.svg'
import {ReactComponent as SaveIcon} from 'assets/icon-save.svg'
import {ReactComponent as DeleteIcon} from 'assets/icon-delete.svg'
import theme from 'theme';
import Button from './Button';

function Header(props) {
  const {drawerWidth, open, setOpen, headerHeight, currFile, setCurrFile, saveFile, setDialogOpen} = props;
  
  function handleOpenDialog() {
    if (currFile.id === '-1') return;
    setDialogOpen(true)
  }
  return (
   <>
     <AppBar 
      position="fixed" 
      sx={{pl: open ? drawerWidth + "px": 0, bgcolor: theme.palette.clr800, boxShadow: 'none'}}
    >
        <Toolbar 
          sx={{
            height: headerHeight, 
            p: 0 + " !important",
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
              bgcolor: theme.palette.clr700,
              "&:hover": {
                bgcolor: theme.palette.primary.main
              }
            }}
          >
            {open ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          <Box sx={{ m: 3 }}>
            <Logo/>               
          </Box>
          <Divider orientation='vertical' sx={{borderColor: theme.palette.clr600, width: '1px', height: '40px', borderWidth: '0 1px 0 0'}}/>
          <ListItem 
            disablePadding 
            sx={{pl: 3, py: 1.5}}
            secondaryAction={
              <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton 
                sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  m: 1.5, p:1.5, 
                  borderRadius: '22px',
                  "& *": { fill: theme.palette.clr500 },
                  "&:hover *": { fill: theme.palette.primary.main }
                }}
                onClick={handleOpenDialog}  
              >
                <DeleteIcon/>
              </IconButton>
              <Button sx={{height: '40px'}} onClick={saveFile}>
                <Box sx={{display: 'flex',alignItems: 'center', '& > * + *': {ml: 1}}} >
                  <SaveIcon/> 
                  <span>Save Changes</span>
                </Box>
              </Button>
              </Box>
            }
          >
            <ListItemIcon sx={{minWidth: 30}}>
              <DocumentIcon />
            </ListItemIcon>
            <Stack>
              <Typography variant='inAppBodyM' sx={{color: theme.palette.clr500}}>Document Name</Typography>
              <Input 
                sx={{
                  '&::before': {borderBottom: 'none'},
                  '&::after': {borderBottom: '1px solid '+ theme.palette.clr100}
                }}
                inputProps={{ 
                  'aria-label': 'description', 
                  variant: "inAppHeadingM",
                  sx: {
                    color: theme.palette.clr100,
                    ...theme.typography.inAppHeadingM,
                    pt: 0,
                    caretColor: theme.palette.primary.main
                  } 
                }}
                onChange={(e)=>setCurrFile((prev) => {
                  return ({...prev, name: e.target.value})
                })}
                value={currFile.name}
              />
            </Stack>
          </ListItem>
        </Toolbar>
      </AppBar>
   </>
  )
}

export default Header