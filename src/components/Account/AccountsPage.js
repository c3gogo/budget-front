import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import MuiAlert from '@material-ui/lab/Alert'
import { useQuery, useMutation } from '@apollo/client'
import AccountsList from './AccountsList'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

import { ADD_ACCOUNT } from './../../graphql/mutations'
import { GET_ACCOUNTS } from './../../graphql/queries'






const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
export default function AccountsPage() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { loading, error, data } = useQuery(GET_ACCOUNTS)
  const [addAccount, { newAccount }] = useMutation(ADD_ACCOUNT, { refetchQueries: [{ query: GET_ACCOUNTS }] })
  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addAccount({ variables: { name }})
    setName("")
    setOpen(false)
  }

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        {
          loading ? (
            <CircularProgress />
          ) : null
        }
        {
          error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : null
        }
        {
          data ? <AccountsList categories={data.categories} /> : null
        }
        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add an account</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Name" fullWidth onChange={(e) => setName(e.target.value)} value={name} />
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
