'use-strict';
// TODO: Add logger and config code

const config = require('../properties');
global.Config = config;

import utils from './utils'
import {ApolloServer} from 'apollo-server-express';
const {buildSubgraphSchema} = require('@apollo/subgraph');
// const { ApolloLogPlugin } = require('apollo-log');
const express = require('express');
import http from 'http';

const resolvers = require('./resolvers').default;
const schema = require('./schema').default;

const app = express();
app.use(express.json());
app.use('/v1', require('./rest/v1')); // TODO Implement rest endpoints for intra service


let apolloServer = null;
let postgresClient = null;


const startApolloServer = async () => {
  postgresClient = await utils.db.posgtres.connect(process.env);
  apolloServer = new ApolloServer({
    introspection: true,
    schema: buildSubgraphSchema([{typeDefs: schema, resolvers}]),
    context: async({req, connection}) => {
      let returnObj = { postgresClient };
      if(connection || req) {
        return returnObj;
      }
    }
    // plugins: [ApolloLogPlugin()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: '/graphql'});
};


const startMainServer = async () => {
  try {
    startApolloServer();
    const httpServer = http.createServer(app);
    const serverApp = httpServer.listen({port: global.Config.appolo_server.port}, () => { });
    serverApp.keepAliveTimeout = 65000;
  } catch (error) {
    console.log(error);
  }
};

startMainServer();