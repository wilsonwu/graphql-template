require('dotenv-flow').config();
const { ApolloServer } = require('apollo-server');

const generalTypeDef = require('./type-defs/general');

const sampleTypeDef = require('./type-defs/sample');
const sampleResolver = require('./resolvers/sample');

const sqlPool = require('./modules/sqlPool');

global.sqlPool = sqlPool;

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true
  },
  typeDefs: [generalTypeDef, sampleTypeDef],
  resolvers: [sampleResolver],
  context: () => {
    // uncomment below line for get operation name
    //let operationName = req.body.operationName;
    return;
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  GraphQL Template Server ready at ${url}`);
});