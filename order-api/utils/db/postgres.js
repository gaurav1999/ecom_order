const massive = require('massive');
// const _config = require('../../config')

const client = {};


const connect = async ({env}) => {
    const { db } = _config.config[env];
    let secretName = 'zs-lambda';
    if(env === 'production') secretName = 'zs-lambda-prod';
    console.log(secretName);
    const secrets = await _config.getsecrets(secretName);
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = secrets;
    db['host'] = POSTGRES_HOST;
    db['password'] =  POSTGRES_PASSWORD;
    db['user'] = POSTGRES_USER;
    console.log(db);
    client[env] = await massive(db);
    return client[env];
}

const disconnect = async ({env}) => {
    client[env].instance.$pool.end();
    delete client[env]
    return
}


module.exports = { connect, disconnect }