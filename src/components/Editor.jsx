import { Box, Typography, TextField } from '@mui/material'
import React, { useState } from 'react'
import theme from 'theme';
import data from 'data.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './Editor.css';

const markdownStyle = {
  '& h1': {
    ...theme.typography.h1
  }
}

function Editor(props) {
  const {headerHeight,open, drawerWidth} = props;
  const [text,setText] = useState(data[1].content);

  function handleChange(e) {
    setText(e.target.value);
  }
  return (
    <>
      <Box 
        sx={{
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
          }}
        >
        <Box sx={{width: '50vw'}}>
          <TextField 
            inputProps={{
              sx: {...theme.typography.code}
            }} 
            sx={{height: '100%', width:'100%'}} 
            multiline 
            rows={36} 
            value={text} 
            onChange={handleChange}
          />
        </Box>
        <Box 
          sx={{
            width: '50vw', 
            height: "100%",
            overflowY: 'scroll',
            p: 3,
            ...theme.typography,
            '& p,li,a,span': {...theme.typography.body},
            '& blockquote *': {...theme.typography.bodyBold},
          }}>          
          <ReactMarkdown>{text}</ReactMarkdown>
        </Box>
      </Box>
    </>
  )
}

export default Editor