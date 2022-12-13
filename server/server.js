const express = require('express');
// Import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// Import our typeDefs and resolvers
const { typeDefs, resolvers } = require ('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const { authMiddleware } = require('./utils/auth');
// Create new Apollo server and pass in our schema data
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	// Integrate our Apollo server with the Express application middleware
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			// Log where we can go to test our GQL API
			console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);