import {GraphQLJSONObject} from 'graphql-type-json';
import {mergeResolvers} from '@graphql-toolkit/schema-merging';

import orderResolvers from './order';

const customScalarResolver = {
  Object: GraphQLJSONObject,
};

export default mergeResolvers([
  customScalarResolver,
  orderResolvers,
]);
