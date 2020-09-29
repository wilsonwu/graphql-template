const { gql } = require('apollo-server');

const companyTypeDef = gql`
  type sample {
    id: ID!
    stringProp: String
    intProp: Int
    bigIntProp: BigInt
    datetimeProp: DateTime
  }
  type sampleResponse {
    code: Int!
    data: sample!
  }
  type samplePageData {
    edges: [sample]
    totalPage: Int
    currentPage: Int
    pageSize: Int
  }
  type sampleListResponse {
    code: Int!
    data: samplePageData
  }
  extend type Query {
    sample(id: Int!): sampleResponse!
    samples(page: Int, size: Int): sampleListResponse!
  }
  extend type Mutation {
    createSample(stringProp: String, intProp: Int, bigIntProp: BigInt, datetimeProp: DateTime): sampleResponse!
  }
`;

module.exports = companyTypeDef;
