import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import MuiAlert from '@material-ui/lab/Alert'
import { gql, useQuery } from '@apollo/client'
import AccountsList from './AccountsList'

import { makeStyles } from '@material-ui/core/styles'

const GET_ACCOUNTS = gql`
  query GetAccounts {
      categories {
      id
      name
      records {
        id
        value
        timestamp
      }
    }
  }
`

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
  const { loading, error, data } = useQuery(GET_ACCOUNTS)
  console.log(loading)
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
        <Fab color="primary" className={classes.fab} aria-label="add">
          <AddIcon />
        </Fab>
      </Container>
    </div>
  )
}
