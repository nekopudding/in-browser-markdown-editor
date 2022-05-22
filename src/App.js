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
import formatDate from 'utils/formatDate';

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
      const newList = [
        {
          id: '1',
          name: resolveFilename(data[1].name, '1'),
          dateCreated: formatDate(new Date()) 
        },
        {
          id: '0',
          name: resolveFilename(data[0].name, '0'),
          dateCreated: formatDate(new Date())
        },
      ]
      setCurrFile(newList[0])
      localStorage.setItem(newList[0].id, JSON.stringify({name: newList[0].name, content: data[1].content}));
      localStorage.setItem(newList[1].id, JSON.stringify({name: newList[1].name, content:data[0].content}));

      localStorage.setItem("files", JSON.stringify(newList));
      setFileList(newList);
  }

  function loadFile(id) {
    if (!localStorage.getItem(id)) {
      console.error("ERROR *** Attempting to load a file that does not exist")
      return;
    }
    const file = JSON.parse(localStorage.getItem(id));
    console.log('loading file: ' + file.name + " | id: " + id);
    setCurrFile({
      id: id,
      name: file.name,
      content:file.content
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
    const resolvedFile = {
      ...currFile,
      name: resolveFilename(currFile.name, currFile.id)
    }
    localStorage.setItem(resolvedFile.id, JSON.stringify({name: resolvedFile.name, content: resolvedFile.content}));
    const updatedList = fileList.map((file, i) => {
        if (file.id === resolvedFile.id && file.name !== resolvedFile.name) {
          return {...file, name: resolvedFile.name}
        } else {return file;}
      })

    setFileList(updatedList);
    setCurrFile(resolvedFile);
    localStorage.setItem("files", JSON.stringify(updatedList));
    
    console.log('saving file: ' + resolvedFile.name + " | id: " + resolvedFile.id);
  }

  function createNewFile() {
    //generate uuid
    const fileId = uuid();
    const newFile = {
      id: fileId,
      name: resolveFilename(data[0].name, fileId),
      dateCreated: formatDate(new Date())
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
  function resolveFilename(filename,id,n = 0) {
    if (fileList.filter(file => file.id !== id && file.name === filename).length !== 0) { //if there is a different file with same name
        const name = filename.split(".md")[0].split("(")[0] //remove .md and (n) suffix
        console.log(name);
        return resolveFilename(`${name}(${n+1}).md`, id, n+1);
    }
    return filename;
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
