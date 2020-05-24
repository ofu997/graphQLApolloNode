import { ApolloServer, gql } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';

const app = express();

// The GraphQL schema provided to the Apollo Server is all the available data for reading and writing
// data via GraphQL. It can happen from any client who consumes the GraphQL API.
const schema = gql`
type Query {
  me: User
}
type User {
  username: String!
}
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Clark Kent',
      };
    },
  },
};

const server = new ApolloServer({
typeDefs: schema,
resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
console.log('Apollo Server on http://localhost:8000/graphql');
});