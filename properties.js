module.exports = {
    postgres: {
        database: "ecom-orders",
        password:"postgres",
        host: "localhost",
        user:"postgres",
        port : 5433
    },
    mongo: {

    },
    rest_server : {
        host : "localhost",
        port : 3000
    },
    appolo_server : {
        port: 7700,
        timeout: 65000
    }
}