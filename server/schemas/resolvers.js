const { AuthenticationError } = require('apollo-server-express');
const { User, Genre } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addFavorites: async (parent, { groupData }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { addFavorites: groupData}
          },
          {
            new: true,
          }
        );
        return updatedUser;
      }
    },
    // Add a third argument to the resolver to access data in our `context`
    addGroup: async (parent, { groupData }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.genre) {
        const updatedGenre = await Genre.findOneAndUpdate(
          { _id: context.genre._id },
          {
            $push: {addGroup: groupData}
          },
          {
            new: true,
          }
        );
        return updatedGenre;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteGroup: async (parent, { groupId }, context) => {
      if (context.genre) {
        const updatedGenre = Genre.findOneAndUpdate(
          { _id: context.genre._id },
          { $pull: { addGroup: { groupId } } },
          { new: true }
        );
        return updatedGenre;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};



module.exports = resolvers;
