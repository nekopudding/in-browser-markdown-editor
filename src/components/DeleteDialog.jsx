import React from 'react'
import {Typography, Modal, Stack} from '@mui/material'
import theme from 'theme';
import Button from './Button';

function DeleteDialog(props) {
  const {dialogOpen,setDialogOpen,handleConfirmDelete, currFile} = props;
  return (
    <>
        <Modal
          open={dialogOpen}
          onClose={()=>setDialogOpen(false)}
          aria-labelledby="confirm deletion"
          aria-describedby="confirm delete dialog"
        >
          <Stack sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 343,
            borderRadius: '4px',
            bgcolor: theme.palette.clr100,
            p: 3,
            '& > * + *': {mt: "16px !important"}
          }}>
            <Typography variant="h4" sx={{color: theme.palette.clr700}}>
              Delete this document?
            </Typography>
            <Typography variant="body" sx={{ display: 'block'}}>
              Are you sure you want to delete ‘{currFile.name}’ document and its contents? This action cannot be reversed.
            </Typography>
            <Button onClick={handleConfirmDelete}>Confirm & Delete</Button>
          </Stack>
        </Modal>
    </>
  )
}

export default DeleteDialog