import { Switch,Box } from '@mui/material'
import {ReactComponent as LightIcon} from 'assets/icon-light-mode.svg'
import {ReactComponent as DarkIcon} from 'assets/icon-dark-mode.svg'
import React from 'react'
import { _ } from 'theme'

function ModeToggle(props) {
  const {darkMode,setDarkMode} = props;
  return (
    <Box sx={{ 
      width: 104, 
      display: 'flex', 
      alignItems: 'center', 
      '& > * + *': {
        ml: 1
      } 
    }}>
      <DarkIcon fill={darkMode ? _.clr100 : _.clr600}/>
      <Switch 
        checked={!darkMode}
        onChange={()=>setDarkMode(!darkMode)}
        aria-label="toggle light/dark mode"
        sx={{
          p: 0, 
          height: 24,
          width: 48,
          borderRadius: '12px',
          "& .MuiSwitch-switchBase": {
            p: 0
          },
          "& .Mui-checked": {
            transform: 'translateX(25px)'
          },
          "& .MuiSwitch-thumb": {
            width: '12px',
            height: '12px',
            color: _.clr100 + " !important"
          },
          "& .MuiSwitch-input": {
            height: '24px',
            width: "72px",
            left: '-24px',
          },
          "& .MuiSwitch-switchBase": {
            p: '6px'
          },
          "& .MuiSwitch-track": {
            bgcolor: _.clr600 + " !important"
          }
        }}
      />
      <LightIcon fill={!darkMode ? _.clr100 : _.clr600} />
    </Box>
  )
}

export default ModeToggle