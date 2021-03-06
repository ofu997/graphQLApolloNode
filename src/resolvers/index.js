var uuid = require('uuid-v4'); 
import messageResolvers from './message';
import userResolvers from './user';

export default [userResolvers, messageResolvers]; 

// export default {
//   Query: {
//     users: (parent, args, { models }) => {
//     return Object.values(models.users);
//     },
//     user: (parent, { id }, { models }) => {
//     return models.users[id];
//     },
//     me: (parent, args, { me }) => {
//     return me;
//     },
//     messages: (parent, args, { models }) => {
//     return Object.values(models.messages);
//     },
//     message: (parent, { id }, { models }) => {
//     return models.messages[id];
//     },
//   },
//   Mutation: {
//     createMessage: (parent, { text }, { me, models }) => {
//       const id = uuid();
//       const message = {
//         id,
//         text,
//         userId: me.id,
//       };
//       models.messages[id] = message;
//       models.users[me.id].messageIds.push(id);
//       return message;
//     },
//     deleteMessage: (parent, { id }, { models }) => {
//       const { [id]: message, ...otherMessages } = models.messages;
//       if (!message) {
//         return false;
//       }
//       models.messages = otherMessages;
//       return true;
//     },
//   },
//   User: {
//     messages: (user, args, { models }) => {
//       return Object.values(models.messages).filter(
//       message => message.userId === user.id,
//       );
//     },
//   },
//   Message: {
//     user: (message, args, { models }) => {
//     return models.users[message.userId];
//     },
//   },
// };