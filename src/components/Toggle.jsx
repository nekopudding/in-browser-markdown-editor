import { Switch } from '@mui/material'
import React from 'react'
import theme from 'theme'

function Toggle(props) {
  const {sx} = props;
  return (
    <Switch
      {...props}
      color='default'
      // sx={{
      //   width: '48px',
      //   height: '24px',
      //   bgcolor: theme.palette.clr600,
      //   borderRadius: '24px',
      //   '& .MuiSwitch-thumb': {
      //     width: '12px',
      //     height: '12px',
      //   },
      //   '& .MuiSwitch-input': {
      //     width: '48px',
      //     height: '24px',
      //     position: 'absolute', 
      //     top: '50%', 
      //     transform: 'translateY(-50%)',
      //   },
      //   ...sx
      // }}
    />
  )
}

export default Toggle