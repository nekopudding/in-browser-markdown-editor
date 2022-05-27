import React from 'react'
import {Button as MuiButton} from '@mui/material'
import theme from 'theme'
import isTouchDevice from 'utils/detectTouchDevice';

function Button(props) {
  const {sx, variant} = props;

  return (
    <MuiButton 
      {...props}
      variant={variant || 'contained'}
      sx={{
        px: {mobile: 0, tablet: 2},
        color: theme.palette.clr100,
        bgcolor: theme.palette.primary.main,
        boxShadow: 'none',
        ...theme.typography.inAppHeadingM,
        textTransform: 'none',
        ...(!isTouchDevice() && {
          '&:hover': {
            bgcolor: theme.palette.primary.light,
            boxShadow: 'none'
          }}),
        ...sx
      }} 
    />
  )
}

export default Button