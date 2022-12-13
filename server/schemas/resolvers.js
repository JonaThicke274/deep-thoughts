const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // Get all thoughts or Get one thought by username
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // Get thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // Get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // Get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
};

module.exports = resolvers;