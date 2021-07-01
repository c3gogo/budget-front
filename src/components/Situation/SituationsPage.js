import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import MuiAlert from '@material-ui/lab/Alert'
import { useMutation } from '@apollo/client'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import _ from 'lodash'



import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import { ADD_SITUATION } from './../../graphql/mutations'
import { GET_SITUATIONS } from './../../graphql/queries'
import SituationsTable from './SituationsTable'
import { Fragment } from 'react'






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
export default function SituationsPage(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [accounts, setAccounts] = useState([])
  const [startDates, setStartDates] = useState([])
  const [endDates, setEndDates] = useState([])



  const [addSituation] = useMutation(ADD_SITUATION, { refetchQueries: [{ query: GET_SITUATIONS }] })

  useEffect(() => {
    let dateAccounts = accounts.reduce((prev,account) => {
      let datesAccount = []
      account.records.forEach(record => {
        if (!datesAccount.includes(new Date(record.timestamp).toDateString())) {
          datesAccount.push(new Date(record.timestamp).toDateString())
        }
      })
      if (!prev.length) return [...datesAccount]
      return _.intersection(prev, datesAccount)
    },[])

    setStartDates(dateAccounts)
    setEndDates(dateAccounts)
    
  }, [accounts])

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addSituation({ variables: { startDate, endDate, categories: accounts.map(account => account.id) }})
    setEndDate(new Date())
    setStartDate(new Date())
    setAccounts([])
    setOpen(false)
  }

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        {
          props.situations ? <SituationsTable situations={props.situations} /> : null
        }
        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a situation</DialogTitle>
          <DialogContent>
            <Select
              labelId="accounts"
              id="accounts"
              multiple
              value={accounts}
              onChange={(e) => {
                setAccounts(e.target.value)
              }}
              input={<Input id="accounts" />}
              renderValue={(accounts) => (
                <div>
                  {accounts.map(({id}) => (
                    <Chip key={id} label={props.accounts.find(account => account.id === id).name}/>
                  ))}
                </div>
              )}
            >
              <MenuItem value="">
                <em>Select accounts</em>
              </MenuItem>
              {props.accounts.map((account) => (
                <MenuItem key={account.id} value={account}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
            {
              startDates.length && endDates.length
                ? (
                  <Fragment>
                    <InputLabel id="start-date-label">Start Date</InputLabel>
                    <Select
                      labelId="start-date-label"
                      id="start-date-select"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select a start date</em>
                      </MenuItem>
                      {
                        startDates.map(date => {
                          return (<MenuItem value={date}>{date}</MenuItem>)
                        })
                      }
                    </Select>
                    <InputLabel id="end-date-label">End Date</InputLabel>
                    <Select
                      labelId="end-date-label"
                      id="end-date-select"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select a start date</em>
                      </MenuItem>
                      {
                        endDates.map(date => {
                          return (<MenuItem value={date}>{date}</MenuItem>)
                        })
                      }
                    </Select>
                  </Fragment>
                ) : null
            }
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
