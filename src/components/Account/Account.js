import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'

import { useMutation } from '@apollo/client'
import { DELETE_ACCOUNT } from './../../graphql/mutations'
import { GET_ACCOUNTS } from './../../graphql/queries'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none'
  },
  deleteIcon: {
    marginLeft: 'auto',
  }
}))






export default function Account(props) {
  const classes = useStyles()
  const [deleteAccount, { deletedAccount }] = useMutation(DELETE_ACCOUNT, { refetchQueries: [{ query: GET_ACCOUNTS }] })

  return (
    <Card className={classes.card}>
      <CardHeader title={props.category.name} />
      <CardContent>
      {
        props.record
          ? (<Typography variant="h3">
            {props.record.value} €
          </Typography>)
        : (<Typography variant="h3">
        0 €
      </Typography>)
      }
      </CardContent>
      <CardActions>
        <Link to={`/accounts/${props.category.id}`} className={classes.link}>
          <Button size="small" color="primary">
            See more
          </Button>
        </Link>
        <IconButton onClick={() => deleteAccount({ variables: { id: props.category.id } })}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </CardActions>
    </Card>
  )
}
