import { Box, Typography } from '@mui/material'
import React from 'react'
import {_} from 'theme'

function EditorHeader(props) {
  const {sx, darkMode} = props;
  let filteredProps = {};
  for (const p in props) { 
    if (p !== "darkMode")
      filteredProps[p] = props[p]
  }

  const headerHeight = 48;
  return (
    <>
      <Box sx={{
        bgcolor: darkMode ? _.clr900 : _.clr200, 
        color: darkMode ? _.clr400 : _.clr500, 
        py: 1.5, px: 2, position: 'absolute', width: '100%', height: headerHeight,zIndex: 100, ...sx
      }}>
        <Typography {...filteredProps} variant='inAppHeadingS'/>
      </Box>
    </>
  )
}

export default EditorHeader;
