const { gql } = require('apollo-server');

const generalTypeDef = gql`
  # scalar declare are all here
  scalar DateTime
  scalar BigInt

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = generalTypeDef;
