async function connect() {
    
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const mysql = require("mysql2/promise");

    const connection = await mysql.createConnection(
        `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );

    console.log("Database connected!");

    global.connection = connection;
    
    return connection;
}

module.exports = connect;

