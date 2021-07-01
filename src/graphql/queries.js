import { gql } from '@apollo/client'

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
const GET_ACCOUNT = gql`
  query GetAccount ($id: ID!) {
      category (id: $id) {
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

const GET_SITUATIONS = gql`
  query GetSituations {
      situations {
      id
      timestamp
      timestampStart
      timestampEnd
      value
      categories {
        id
        name
      }
    }
  }
`


export {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  GET_SITUATIONS
}