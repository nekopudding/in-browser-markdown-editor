import React, {useState, useEffect} from 'react'
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material'
import theme from 'theme';
import Button from 'components/Button';
import ModeToggle from 'components/ModeToggle';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Editor from 'components/Editor';
import data from 'data.json'
import { v4 as uuid } from 'uuid';

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
  const today = new Date();

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

      const newList = [
        {
          id: '1',
          name: data[1].name,
          dateCreated: today.getDate()
        },
        {
          id: '0',
          name: data[0].name,
          dateCreated: today.getDate()
        },
      ]
      localStorage.setItem("files", JSON.stringify(newList));
      setFileList(newList);
  }

  function loadFile(id) {
    if (!localStorage.getItem(id)) {
      console.error("ERROR *** Attempting to load a file that does not exist")
      return;
    }
    console.log('loading file: ' + JSON.parse(localStorage.getItem(id)).name + " | id: " + id);
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
    const files = JSON.parse(localStorage.getItem("files"));
    if (files === null || files.length === 0) { initFiles(); return; }

    setFileList(files);
    loadFile(files[0].id);

  },[])

  function saveFile() {
    localStorage.setItem(currFile.id, JSON.stringify({name: currFile.name, content: currFile.content}));
    const updatedList = fileList.map((file, i) => {
        if (file.id === currFile.id && file.name != currFile.name) {
          return {...file, name: currFile.name}
        } else {return file;}
      })

    setFileList(updatedList);
    localStorage.setItem("files", JSON.stringify(updatedList));
    
    console.log('saving file: ' + currFile.name + " | id: " + currFile.id);
  }

  function createNewFile() {
    //generate uuid
    const newFile = {
      id: uuid(),
      name: data[0].name,
      dateCreated: today.getDate()
    }
    const updatedList = [...fileList, newFile]
    setFileList(updatedList)
    localStorage.setItem("files", JSON.stringify(updatedList));
    localStorage.setItem(newFile.id,JSON.stringify({name: newFile.name, content: ""}))
    loadFile(newFile.id)
  }
  function deleteFile() {
    const updatedList = fileList.filter((file,i)=> file.id !== currFile.id)
    localStorage.removeItem(currFile.id);
    localStorage.setItem("files",JSON.stringify(updatedList));
    setFileList(updatedList);
    setCurrFile({
      id: '-1',
      name: '',
      content: ''
    })
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
          setCurrFile={setCurrFile}
          saveFile={saveFile}
          deleteFile={deleteFile}
        /> 
        <Sidebar 
          open={open} 
          setOpen={setOpen} 
          drawerWidth={drawerWidth} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          fileList={fileList}
          loadFile={loadFile}
          createNewFile={createNewFile}
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
