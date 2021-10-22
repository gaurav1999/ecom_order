import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        testOrder(data:String):String
    }

    extend type Mutation{
        testMutation(data:String):String
    }
`;

