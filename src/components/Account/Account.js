import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function Account(props) {
  return (
    <Card>
      <CardHeader title={props.category.name} />
      <CardContent>
      <Typography variant="h6">
        {props.record.value} €
        le {new Date(props.record.timestamp).toLocaleDateString()}
      </Typography>
      </CardContent>
    </Card>
  )
}
