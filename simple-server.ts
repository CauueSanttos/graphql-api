/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApolloServer } from 'apollo-server';
import { randomUUID } from 'node:crypto';

const typeDefs = `
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }
    
    type Mutation {
      createUser(name: String!): User!
    }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => users,
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
