import {mergeTypeDefs} from '@graphql-toolkit/schema-merging';
import {gql} from 'apollo-server-express';
import orderSchema from './order';

const linkSchema = gql`
  scalar Date
  scalar Object

  # type Query {
  #   _: Boolean
  # }

  type Mutation {
    _: Boolean
  }
`;


export default mergeTypeDefs([
  linkSchema,
  orderSchema,
]);
