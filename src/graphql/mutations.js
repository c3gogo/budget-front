import { gql } from '@apollo/client'

const ADD_ACCOUNT = gql`
  mutation createAccounts($name: String!) {
    createCategory(name: $name) {
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

const DELETE_ACCOUNT = gql`
  mutation deleteAccounts($id: ID!) {
    deleteCategory(id: $id) {
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

export {
  ADD_ACCOUNT,
  DELETE_ACCOUNT
}