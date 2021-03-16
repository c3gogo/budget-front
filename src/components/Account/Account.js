import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'

import { useMutation } from '@apollo/client'
import { DELETE_ACCOUNT } from './../../graphql/mutations'
import { GET_ACCOUNTS } from './../../graphql/queries'





export default function Account(props) {
  const [deleteAccount, { deletedAccount }] = useMutation(DELETE_ACCOUNT, { refetchQueries: [{ query: GET_ACCOUNTS }] })

  return (
    <Link to={`/accounts/${props.category.id}`}>
      <Card>
        <CardHeader title={props.category.name} />
        <CardContent>
        {
          props.record
            ? (<Typography variant="h6">
              {props.record.value} €
              le {new Date(props.record.timestamp).toLocaleDateString()}
            </Typography>)
          : null
        }
        </CardContent>
        <CardActions>
          <IconButton onClick={() => deleteAccount({ variables: { id: props.category.id } })}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  )
}
