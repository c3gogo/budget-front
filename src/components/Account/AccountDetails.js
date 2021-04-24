import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { GET_ACCOUNT, GET_ACCOUNTS } from './../../graphql/queries'
import { ADD_RECORD } from './../../graphql/mutations'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { makeStyles } from '@material-ui/core/styles'

import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

import RecordsTable from '../Record/RecordsTable'

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
  console.log(accountId)
  const { data } = useQuery(GET_ACCOUNT, { variables: {
    id: accountId
  }})
  const [addRecord] = useMutation(ADD_RECORD, { refetchQueries: [{ query: GET_ACCOUNTS }] })

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
    addRecord({ variables: { value: parseFloat(value), categoryId: accountId }})
    setValue()
    setOpen(false)
  }
  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <RecordsTable records={data ? data.category.records : []} />
         <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a record</DialogTitle>
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
