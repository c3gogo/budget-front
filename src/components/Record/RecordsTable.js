import { TableRow } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import { useMutation } from '@apollo/client'
import { DELETE_RECORD } from './../../graphql/mutations'
import { GET_ACCOUNTS } from './../../graphql/queries'



export default function RecordsTable(props) {
  const [deleteRecord] = useMutation(DELETE_RECORD, { refetchQueries: [{ query: GET_ACCOUNTS }] })

  const rows = props.records.map(record => {
    return {
      id: record.id,
      value: record.value,
      date: record.timestamp
    }
  })
  const headCells = [
    { id: 'amount', disablePadding: false, label: 'Amount (€)' },
    { id: 'date', disablePadding: false, label: 'Date' },
    { id: 'actions', disablePadding: false, label: 'Actions' }
]
  return (
    <TableContainer>
      <Table>
        <TableHead
        >
          {headCells.map(headCell => {
            return (<TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'default'}
            >
             {headCell.label}
            </TableCell>)
          })}
        </TableHead>
        <TableBody>
          {
            rows.map(row => {
              return (<TableRow>
                <TableCell>{row.value}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="small" color="red" onClick={() => deleteRecord({variables: { id: row.id }})}>
                    <DeleteIcon />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>)
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
