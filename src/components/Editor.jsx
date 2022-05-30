import { Box, TextField, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme, {_,darkTheme} from 'theme';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import EditorHeader from './EditorHeader';
import {ReactComponent as ShowPreviewIcon} from 'assets/icon-show-preview.svg';
import {ReactComponent as HidePreviewIcon} from 'assets/icon-hide-preview.svg';
import isTouchDevice from 'utils/detectTouchDevice';


const editorHeaderOffset = 48;


function Editor(props) {
  const {headerHeight,open, drawerWidth, currFile, darkMode, sidebarTransition,content,setContent, windowD} = props;
  const [preview,setPreview] = useState(false);
  

  const markdownStyle = {
    width: '100%',
    p: 3,
    mx: preview ? {mobile:'auto',tablet: 3, desktop: '25%'} : 'auto',
    ...((darkMode ? darkTheme : theme).typography),
    '& p,li,a,span': (darkMode ? darkTheme : theme).typography.body,
    '& blockquote, pre': {
      bgcolor: darkMode ? _.clr800 : _.clr200, 
      p: 3, 
      mx: 0,
      borderRadius: '4px',
    },
    '& blockquote': { 
      borderLeft: '4px ' + _.primary.main + ' solid',
    },
    '& code': {
      color: darkMode ? _.clr100 : _.clr700,
    },
    '& pre': { //scroll for code blocks
      overflowX: 'auto',
    },
    '& blockquote *': (darkMode ? darkTheme : theme).typography.bodyBold,
    '& ul': {listStyle: 'none',position: 'relative',},
    '& ul li::before': {
      content: '"\\2022"',  //unicode for a bullet
      fontFamily: 'Roboto Slab', 
      color: _.primary.main, 
      position: 'absolute',
      fontWeight: 900, 
      display: 'inline-block', 
      width: '1em', 
      ml: '-1em', 
    },
    '& > *:first-child': {mt: 0, pt: 0}, //remove top spacing of first element
  }
  const editorStyle = {
    width: '100vw', 
    overflowX: open ? 'hidden' : 'visible',
    position: 'relative',
    mt: headerHeight + "px", 
    height: windowD.height - headerHeight, 
    display:'flex',
    flexGrow: 1,
    ml: open ? 0 : `-${drawerWidth}px`,
    ...sidebarTransition('margin'),
  }

  function handleChange(e) {
    setContent(e.target.value);
  }

  useEffect(()=>{
    setContent(currFile.content);
  },[currFile]);



  return (
    <>
      <Box sx={editorStyle}>
        <Box 
          sx={{
            width: {mobile: '100%', tablet: '50vw'}, 
            overflowY: 'scroll', 
            WebkitOverflowScrolling: 'touch',
            display: preview ? 'none' : 'block',
          }}>
          <EditorHeader darkMode={darkMode} sx={{width: {mobile: '100%', tablet: '50vw'},display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', }}>
            MARKDOWN
            <IconButton
              sx={{
                borderRadius: '16px', 
                position: 'absolute',
                right: '16px',
                width: 32, height: 32,
                "& *": { fill: darkMode ? _.clr400 : _.clr500 },
                ...(!isTouchDevice() && {
                  "&:hover *": {fill: _.primary.main},
                  "&:hover": {bgcolor: 'transparent'}
                }),
                display: (preview || open) ? 'none' : {mobile: 'inline-flex', tablet: 'none'},
              }}
              onClick={()=>setPreview(!preview)}
            >
              <ShowPreviewIcon/>
            </IconButton>
          </EditorHeader>
          <Box sx={{height: editorHeaderOffset}}/>
          <TextField 
            sx={{
              width:'100%',
              '& fieldset': { borderWidth: '0 !important'},
              '.MuiInputBase-root': {p: 0},
              '.MuiInputBase-root textarea': { p: 2 }
            }}
            multiline 
            value={content} 
            onInput={(e)=>handleChange(e)}
            InputProps={{
              sx: {...(darkMode ? darkTheme : theme).typography.code, caretColor: (darkMode ? darkTheme : theme).typography.code.color}
            }} 
            inputProps={{
              'aria-label': 'markdown input'
            }}
          />
        </Box>
        <Divider orientation='vertical' sx={{borderColor: darkMode ? _.clr600 : _.clr300, zIndex: 200, display: preview ? 'none' : 'block'}}/>
        <Box 
          sx={{ 
            width: preview ? '100%' : '50vw', 
            overflowY: 'scroll', WebkitOverflowScrolling: 'touch',
            display: preview ? 'block' : {mobile: 'none', tablet: 'block'},
          }}
        >
          <EditorHeader 
            darkMode={darkMode} 
            sx={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: preview ? (open ? {mobile: '100%', tablet: windowD.width - drawerWidth} : "100%") : '50vw', 
              ...sidebarTransition('width')
            }}
          >
            PREVIEW
            <IconButton
              sx={{
                borderRadius: '16px', 
                position: 'absolute',
                right: '16px',
                width: 32, height: 32,
                "& *": { fill: darkMode ? _.clr400 : _.clr500 },
                ...(!isTouchDevice() && {
                  "&:hover *": {fill: _.primary.main},
                  "&:hover": {bgcolor: 'transparent'}
                }),
                display: (open) ? 'none' : 'inline-flex',
              }}
              aria-label="fullscreen markdown preview"
              onClick={()=>setPreview(!preview)}
            >
              {preview ? <HidePreviewIcon/> : <ShowPreviewIcon/>}
            </IconButton>
          </EditorHeader>
          <Box sx={{height: editorHeaderOffset}}/>
          <Box sx={{display: 'flex', justifyContent:'center'}}>
            <Box sx={markdownStyle}>  
              <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Editor