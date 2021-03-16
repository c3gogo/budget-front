import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { GET_ACCOUNT } from './../../graphql/queries'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { makeStyles } from '@material-ui/core/styles'

import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import RecordsList from './../Record/RecordsList'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function AccountDetails() {
  const classes = useStyles()
  const { accountId } = useParams()
  const { loading, err, data } = useQuery(GET_ACCOUNT, { variables: {
    id: accountId
  }})
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValue()
    setOpen(false)
  }
  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <RecordsList records={data ? data.category.records : []} />
         <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add an account</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="value" label="Value" type="number" fullWidth onChange={(e) => setValue(e.target.value)} value={value} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Fab color="primary" className={classes.fab} aria-label="add" onClick={handleOpenModal}>
          <AddIcon />
        </Fab>
      </Container>
    </div>
  )
}
