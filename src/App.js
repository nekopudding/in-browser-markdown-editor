import React, {useState, useEffect} from 'react'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import theme, { darkTheme } from 'theme';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Editor from 'components/Editor';
import data from 'data.json'
import { v4 as uuid } from 'uuid';
import formatDate from 'utils/formatDate';
import DeleteDialog from 'components/DeleteDialog';

const drawerWidth = 250;
const headerHeight = 72;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false);

  //list of files in localStorage
  const [fileList,setFileList] = useState([]);

  //current file info
  const [currFile,setCurrFile] = useState({id: '1',name: data[1].name, content: data[1].content})
  const [content,setContent] = useState(""); //middleman for holding content to prevent over-rendering

  const [windowD, setWindowD] = useState({width: window.innerWidth, height: window.innerHeight})
  useEffect(()=>{
    window.addEventListener('resize', () => {
      setWindowD({width: window.innerWidth, height: window.innerHeight});
    })
  },[]) //always sync to current window size

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
      id: currFile.id,
      name: resolveFilename(currFile.name, currFile.id),
      content: content
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
        return resolveFilename(`${name}(${n+1}).md`, id, n+1);
    }
    return filename;
  }
  function handleConfirmDelete() {
    deleteFile();
    setDialogOpen(false)
  };

  const sidebarTransition = (attr) => {
    return {
      transition: theme.transitions.create(attr, {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(sidebarOpen && {
        transition: theme.transitions.create(attr, {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      })
    }
  }

  return (
   <>
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex'}}>
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen} 
          drawerWidth={drawerWidth} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          fileList={fileList}
          loadFile={loadFile}
          createNewFile={createNewFile}
          currFile={currFile}
          headerHeight={headerHeight}
        />
        <Header 
          open={sidebarOpen} 
          setOpen={setSidebarOpen} 
          drawerWidth={drawerWidth} 
          headerHeight={headerHeight}
          currFile={currFile}
          setCurrFile={setCurrFile}
          saveFile={saveFile}
          deleteFile={deleteFile}
          setDialogOpen={setDialogOpen}
          sidebarTransition={sidebarTransition}
          windowD={windowD}
        /> 
        <Editor 
          headerHeight={headerHeight} 
          open={sidebarOpen} 
          drawerWidth={drawerWidth}
          currFile={currFile}
          setCurrFile={setCurrFile}
          darkMode={darkMode}
          sidebarTransition={sidebarTransition}
          content={content}
          setContent={setContent}
          windowD={windowD}
        />
        <DeleteDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          handleConfirmDelete={handleConfirmDelete}
          currFile={currFile}
        />
      </Box>
    </ThemeProvider>
   </>
  )
}

export default App;
