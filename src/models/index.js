let users = {
  1: {
    id: '1',
    username: 'Clark Kent',
    world: 'Superman',
    messageIds: [1], 
  },
  2: {
    id: '2',
    username: 'Hermione Granger',
    world: null,
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2', 
  },
  3: {
    id: '3',
    text: 'Ron is mad at you',
    userId: '2',
  }
}

export default {
  users, 
  messages, 
};