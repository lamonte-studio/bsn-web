import { ApolloClient, InMemoryCache } from '@apollo/client';

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

const graphQlClient = new ApolloClient({
  // Sandbox URL
  uri: process.env.BSN_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export default graphQlClient;
