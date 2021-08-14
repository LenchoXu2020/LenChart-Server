/**postgres.js*/
const Pool = require('pg-pool');
const config = require('../config/pg_db.js')

const pool = new Pool(config);

exports.query = (SQL, value) =>{
    return new Promise((resolve, reject) => {
        pool.connect((err,client) => {
            if(err) reject(err);
            client.query(SQL, value, (err, res) => {
                // client操作完后建议手动进行释放
                client.release();
                if(err) reject(err);
                resolve(res);
            });
        });
    });
};