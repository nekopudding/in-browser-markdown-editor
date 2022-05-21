import { Box, Typography, TextField, Divider } from '@mui/material'
import React, { useState } from 'react'
import theme from 'theme';
import data from 'data.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import EditorHeader from './EditorHeader';


const headerOffset = 48;
const markdownStyle = {
  p: 3,
  ...theme.typography,
  '& p,li,a,span': {...theme.typography.body},
  '& blockquote, pre': {
    bgcolor: theme.palette.clr200, 
    p: 3, 
    ml: 0
  },
  '& blockquote': { 
    borderLeft: '4px ' + theme.palette.primary.main + ' solid',
    borderRadius: '4px'
  },
  '& blockquote *': {...theme.typography.bodyBold},
  '& ul': {listStyle: 'none'},
  '& ul li::before': {
    content: '"\\2022"',  /* Add content: \2022 is the CSS Code/unicode for a bullet */
    color: theme.palette.primary.main, /* Change the color */
    fontWeight: 'bold', /* If you want it to be bold */
    display: 'inline-block', /* Needed to add space between the bullet and the text */
    width: '1em', /* Also needed for space (tweak if needed) */
    ml: '-1em', /* Also needed for space (tweak if needed) */
  },
  '& > *:first-child': {mt: 0, pt: 0}, //remove top spacing of first element
  // '& > *:last-child': {mb: 3, pb: 3},
}

function Editor(props) {
  const {headerHeight,open, drawerWidth} = props;
  const [text,setText] = useState(data[1].content);

  const editorStyle = {
    mt: headerHeight + "px", 
    height: window.innerHeight - headerHeight, 
    width: '100vw', 
    display:'flex',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }

  function handleChange(e) {
    setText(e.target.value);
  }
  return (
    <>
      <Box sx={editorStyle}>
        <Box sx={{width: '50vw', overflowY: 'scroll'}}>
          <EditorHeader headerHeight={headerOffset}>MARKDOWN</EditorHeader>
          <Box sx={{height: headerOffset}}/>
          <TextField 
            sx={{
              // height: '100%', 
              width:'100%',
              '& fieldset': { borderWidth: '0 !important'},
              '.MuiInputBase-root': {p: 0},
              '.MuiInputBase-root textarea': {
                p: 2,
              }
            }}
            multiline 
            value={text} 
            onChange={handleChange}

            InputProps={{sx: {...theme.typography.code}}} 
            
          />
        </Box>
        <Divider orientation='vertical' sx={{borderColor: theme.palette.clr300, zIndex: 200}}/>
        <Box sx={{ width: '50vw', overflowY: 'scroll'}}>
          <EditorHeader headerHeight={headerOffset}>PREVIEW</EditorHeader>
          <Box sx={{height: headerOffset}}/>
          <Box sx={markdownStyle}>  
            <ReactMarkdown>{text}</ReactMarkdown>
            <Box sx={{height: '24px'}} /> {/* adds a bottom padding to bottom of overflow */}
          </Box>
        </Box>
        
      </Box>
    </>
  )
}

export default Editor