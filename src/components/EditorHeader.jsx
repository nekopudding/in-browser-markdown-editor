import { Box, Typography } from '@mui/material'
import React from 'react'
import theme from 'theme'

function EditorHeader(props) {
  const {sx, headerHeight} = props
  return (
    <>
      <Box sx={{bgcolor: theme.palette.clr200, color: theme.palette.clr500, py: 1.5, px: 2, position: 'absolute', width: '100%', height: headerHeight,zIndex: 100}}>
        <Typography  {...props} variant='inAppHeadingS'/>
      </Box>
    </>
  )
}

export default EditorHeader