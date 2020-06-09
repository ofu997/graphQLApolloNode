import { gql } from 'apollo-server-express';
import messageSchema from './message';
import userSchema from './user';


const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
export default [linkSchema, userSchema, messageSchema];

// export default gql`
// type Query {
//   users: [User!]
//   user(id: ID!): User
//   me: User
//   messages: [Message!]!
//   message(id: ID!): Message!
// }

// type Mutation {
//   createMessage(text: String!): Message!
//   deleteMessage(id: ID!): Boolean!
// }

// type User {
//   id: ID!
//   username: String!
//   messages: [Message!]
// }

// type Message {
//   id: ID!
//   text: String!
//   user: User!
// }
// `;