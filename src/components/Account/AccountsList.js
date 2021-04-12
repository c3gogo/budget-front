import React from 'react'
import Grid from '@material-ui/core/Grid'
import Account from './Account'

export default function AccountsList(props) {
  return (
    <div>
      <Grid container spacing={3}>
        {
          props.categories.map(category => {
            console.log(category)
            return (
              <Grid item xs={3}>
                <Account key={category.id} category={category} record={category.records.length ? category.records[0]: null}/>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}
