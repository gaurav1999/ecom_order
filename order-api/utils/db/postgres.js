const massive = require('massive');
// const _config = require('../../config')

const client = {};


const connect = async ({env}) => {
    console.log("Connecting Postgres...");
    client[env] = await massive(global.Config.postgres);
    return client[env];
}

const disconnect = async ({env}) => {
    console.log("Disconnecting postgres...");
    client[env].instance.$pool.end();
    delete client[env]
    return
}


module.exports = { connect, disconnect }