import React, {useState, useEffect} from 'react'
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';
import Button from 'components/Button';
import ModeToggle from 'components/ModeToggle';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Editor from 'components/Editor';
import data from 'data.json'

const drawerWidth = 240;
const headerHeight = 72;

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  //list of files in localStorage
  const [fileList,setFileList] = useState([]);

  //current file info
  const [currFile,setCurrFile] = useState({id: '1',name: data[1].name, content: data[1].content})

  const commonProps = {
    darkMode: darkMode
  }

  //init some files for first time visiters
  function initFiles() {
      console.log("initializing sample files...");
      setCurrFile({
        id: '1',
        name: data[1].name,
        content: data[1].content
      })

      localStorage.setItem('1', JSON.stringify({name: data[1].name, content: data[1].content}));
      localStorage.setItem('0', JSON.stringify({name:data[0].name, content:data[0].content}));

      const today = new Date();
      localStorage.setItem("files", JSON.stringify(
        [
          {
            id: '0',
            name: data[0].name,
            dateCreated: today.getDate()
          },
          {
            id: '1',
            name: data[1].name,
            dateCreated: today.getDate()
          },
        ]
      ));
  }

  function loadFile(id) {
    if (!localStorage.getItem(id)) {
      console.error("ERROR *** Attempting to load a file that does not exist")
      return;
    }
    console.log('loading file: ' + JSON.parse(localStorage.getItem(id)).name);
    setCurrFile({
      id: id,
      name: JSON.parse(localStorage.getItem(id)).name,
      content:JSON.parse(localStorage.getItem(id)).content
    })
  }

  useEffect(()=> {
    /*
    procedure - get files - for each file in list, put into sidebar with the info - date, title
    loading files - fetch file text from filename
    */
    const files = localStorage.getItem("files");
    if (files === null) { initFiles(); return; }

    setFileList(JSON.parse(files));
    loadFile('1');

  },[])

  function handleSave() {
    localStorage.setItem(currFile.id, JSON.stringify({name: currFile.name, content: currFile.content}));
    //if filename was changed, delete old file, save new
    console.log('saving file: ' + currFile.name);
  }

  return (
   <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
        <Header 
          open={open} 
          setOpen={setOpen} 
          drawerWidth={drawerWidth} 
          headerHeight={headerHeight}
          currFile={currFile}
          handleSave={handleSave}
        /> 
        <Sidebar 
          open={open} 
          setOpen={setOpen} 
          drawerWidth={drawerWidth} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          fileList={fileList}
          loadFile={loadFile}
        />
        <Editor 
          headerHeight={headerHeight} 
          open={open} 
          drawerWidth={drawerWidth}
          currFile={currFile}
          setCurrFile={setCurrFile}
        />
      </Box>
    </ThemeProvider>
   </>
  )
}

export default App;
