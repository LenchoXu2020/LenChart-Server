const devConfig = {
    user: 'postgres',
    password: 'root',
    host: 'hadoop104',
    port: 5432,
    database: 'db01',
    // ssl: true
};

const prodConfig = {
    user: 'postgres',
    password: '123',
    host: '192.168.102.200',
    port: 5432,
    database: 'gtdcywk',
    // ssl: true
};

module.exports = prodConfig;