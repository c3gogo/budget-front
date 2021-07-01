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

const ADD_RECORD = gql`
  mutation createRecord($value: Float!, $categoryId: ID!) {
    createRecord(value: $value, categoryId: $categoryId) {
      id,
      value
      timestamp
      category {
        id
        name
      }
    }
  }
`

const DELETE_RECORD = gql`
  mutation deleteRecord($id: ID!) {
    deleteRecord(id: $id) {
      id,
      value
      timestamp
      category {
        id
        name
      }
    }
  }
`
const ADD_SITUATION = gql`
  mutation createSituation($startDate: ISODate!, $endDate: ISODate!, $categories: [ID!]!) {
    createSituation(startDate: $startDate, endDate: $endDate, categories: $categories) {
      id
      timestampStart
      timestampEnd
      timestamp
      value
      categories {
        id
        name
      }
    }
  }
`

const DELETE_SITUATION = gql`
  mutation deleteSituation($id: ID!) {
    deleteSituation(id: $id) {
      id
      timestampStart
      timestampEnd
      timestamp
      value
      categories {
        id
        name
      }
    }
  }
`
export {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_RECORD,
  DELETE_RECORD,
  ADD_SITUATION,
  DELETE_SITUATION
}