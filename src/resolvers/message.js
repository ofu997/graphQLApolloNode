var uuid = require('uuid-v4'); 

export default {
  Query: {
    messages: (parent, args, { models }) => {
      ...
    },
    message: (parent, { id }, { models }) => {
      ...
    },
  },
  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      ...
    },
    deleteMessage: (parent, { id }, { models }) => {
      ...
    },
  },
  Message: {
    user: (message, args, { models }) => {
      ...
    },
  },
};