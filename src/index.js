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

    messages: [Message!]!
    message(id: ID!): Message!
  }
  type User {
    id: ID!
    username: String!
    world: String
  }

  type Message {
    id: ID!
    text: String!
    userId: ID!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Clark Kent',
    world: 'Superman'
  },
  2: {
    id: '2',
    username: 'Hermione Granger',
    world: null 
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
}

// pass to context object in const server
// const me = users[1];

// resolvers are used to return data for fields
// from the schema. Resolvers are agnostic according to where the data
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
    // me: () => {
    //   return me;
    // },
    me: (parent, args, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  // resolvers are grouped in a JavaScript object, often called a resolver map
  User: {
    username: parent => {
      return parent.username+'!'; 
    },
    // rename parent argument
    // username: user => {
    //   return user.username; 
    // },
    world: user => {
      return user.world === null? 'not applicable': user.world; 
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
  context: {
    me: users[1],
    },
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
console.log('Apollo Server on http://localhost:8000/graphql');
});