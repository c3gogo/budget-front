import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT } from '../../graphql/queries'

export default function RecordsList(props) {
  return (
    <div>
      {
        props.records.map(record => {
          return <p>record.value</p>
        })
      }
    </div>
  )
}
