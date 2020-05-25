import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(cors());

// The GraphQL schema provided to the Apollo Server is all the available data for reading and writing
// data via GraphQL. It can happen from any client who consumes the GraphQL API.
// ID scalar type denotes an identifier used internally for
// advanced features like caching or refetching.
const schema = gql`
type Query {
  users: [User!]
  me: User
  user(id: ID!): User
}
type User {
  id: ID!
  username: String!
}
`;

let users = {
  1: {
    id: '1',
    username: 'Clark Kent',
  },
  2: {
    id: '2',
    username: 'Hermione Granger',
  },
};

// pass to context object in const server
// const me = users[1];

// resolvers are used to return data for fields
// from the schema resolvers are agnostic according to where the data
// comes from

// Once you add a new query to your schema, you are
// obligated to define it in your resolvers within the Query object:
const resolvers = {
  Query: {
    // Each top level query in your Query type has to have a resolver
    users: () => {
      return Object.values(users); 
    },
    // The first argument is called the parent or root argument, and always returns the previously resolved field
    user: (parent, { id }) => {
      return users[id];
    }, 
    me: () => {
      return me;
    },
  },
  // resolvers are grouped in a JavaScript object, often called a resolver map
  User: {
    // username: () => 'Draco Malfoy',
    // username: parent => {
    //   return parent.username; 
    // }
    // rename parent argument
    username: user => {
      return user.username; 
    }
    // full username
    // username: user => `${user.firstname} ${user.lastname}`,
  },
};

// A GraphQL schema is defined by its types, the relationships between the types,
// and their structure

const server = new ApolloServer({
typeDefs: schema,
resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
console.log('Apollo Server on http://localhost:8000/graphql');
});