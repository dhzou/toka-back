import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = process.env.IS_MOCK
  ? require('@/mock/schema-link').default
  : require('./http-link').default

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
