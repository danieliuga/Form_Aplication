
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Formulario', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  user: String,
  name: String,
  surname: String,
  country: String,
  dni: String,
});

const User = mongoose.model('User', userSchema);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const typeDefs = gql`
  type User {
    user: String!
    name: String!
    surname: String!
    country: String!
    dni: String!
  }

  type Query {
    users: [User!]!
    findPerson(name: String!): User
  }

  type Mutation {
    createUser(user: String!, name: String!, surname: String!, country: String!, dni: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users from database');
      }
    },
    findPerson: async (_, { name }) => {
      try {
        const person = await User.findOne({ name });
        return person;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch a person from the database');
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const newUser = new User(args);
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create a new user');
      }
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});