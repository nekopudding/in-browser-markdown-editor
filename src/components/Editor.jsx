import { Box, Typography, TextField, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from 'theme';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import EditorHeader from './EditorHeader';
import {ReactComponent as ShowPreviewIcon} from 'assets/icon-show-preview.svg';
import {ReactComponent as HidePreviewIcon} from 'assets/icon-hide-preview.svg';


const editorHeaderOffset = 48;
const markdownStyle = {
  width: '50vw',
  p: 3,
  ...theme.typography,
  '& p,li,a,span': {...theme.typography.body},
  '& blockquote, pre': {
    bgcolor: theme.palette.clr200, 
    p: 3, 
    mx: 0,
    borderRadius: '4px',
  },
  '& blockquote': { 
    borderLeft: '4px ' + theme.palette.primary.main + ' solid',
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
  const {headerHeight,open, drawerWidth, currFile, setCurrFile} = props;
  const [preview,setPreview] = useState(false);

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
    ml: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }

  function handleChange(e) {
    setCurrFile((prev) => {
      console.log({...prev, content: e.target.value});
      return ({...prev, content: e.target.value})
    })
  }

  useEffect(()=>{
    setCurrFile((prev) => {
      return ({...prev, content: " " + prev.content})
    })
  },[currFile,setCurrFile]);

  return (
    <>
      <Box sx={editorStyle}>
        <Box sx={{width: '50vw', overflowY: 'scroll', display: preview ? 'none' : 'block'}}>
          <EditorHeader sx={{width: '50vw'}}>MARKDOWN</EditorHeader>
          <Box sx={{height: editorHeaderOffset}}/>
          <TextField 
            sx={{
              width:'100%',
              '& fieldset': { borderWidth: '0 !important'},
              '.MuiInputBase-root': {p: 0},
              '.MuiInputBase-root textarea': { p: 2 }
            }}
            multiline 
            value={currFile.content} 
            onInput={(e)=>handleChange(e)}
            type="textarea"
            InputProps={{sx: {...theme.typography.code}}} 
            
          />
        </Box>
        <Divider orientation='vertical' sx={{borderColor: theme.palette.clr300, zIndex: 200}}/>
        <Box sx={{ width: preview ? '100%' : '50vw', overflowY: 'scroll', position: 'abosolute'}}>
          <EditorHeader sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: preview ? '100%' : '50vw' }}>
            PREVIEW
            <IconButton
              sx={{
                borderRadius: '16px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32, height: 32,
                "& *": { fill: theme.palette.clr500 },
                "&:hover *": { fill: theme.palette.primary.main},
                "&:hover": {bgcolor: 'transparent'}
              }}
              onClick={()=>setPreview(!preview)}
            >
              {preview ? <HidePreviewIcon/> : <ShowPreviewIcon/>}
            </IconButton>
          </EditorHeader>
          <Box sx={{height: editorHeaderOffset}}/>
          <Box sx={{display: 'flex', justifyContent:'center'}}>
            <Box sx={markdownStyle}>  
              <ReactMarkdown>{currFile.content}</ReactMarkdown>
            </Box>
          </Box>

        </Box>
        
      </Box>
    </>
  )
}

export default Editor