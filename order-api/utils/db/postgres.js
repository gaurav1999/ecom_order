const massive = require('massive');
// const _config = require('../../config')

let client = null;


const connect = async () => {
    console.log("Connecting Postgres...");
    client = await massive(global.Config.postgres);
    return client;
}

const disconnect = async () => {
    console.log("Disconnecting postgres...");
    client.instance.$pool.end();
    client = null;
    return
}


module.exports = { connect, disconnect }