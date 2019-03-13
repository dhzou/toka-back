import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import workList from './mock-data/workList';
import { typeDefs } from './schema/demo';

const schema = makeExecutableSchema({
  typeDefs
});

const mocks = {
  Query: () => ({
    workList: () => workList,
  }),
};

addMockFunctionsToSchema({
  schema,
  mocks,
});

export default new SchemaLink({ schema });
