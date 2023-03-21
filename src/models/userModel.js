const pool = require('./db');

module.exports = {
    createSchema: async () => {
        const sql = `CREATE TABLE user (
            user_name VARCHAR(30) NOT NULL COMMENT '유저 이름',
            user_email VARCHAR(50) NOT NULL COMMENT '유저 이메일',
            password VARCHAR(128) NOT NULL COMMENT '패스워드(SHA 512)',
            salt VARCHAR(128) NOT NULL COMMENT '솔트값'
        )`;
        const result = await pool.execute(sql);
        return result;
    }
    ,
    findOne: async (user_email) => {
        const sql = `SELECT * FROM user WHERE user_email ='${user_email}'`
        const result = await pool.execute(sql);
        return result[0];
    },
    findAll: async () => {
        const sql = 'SELECT * FROM user';
        const result = await pool.execute(sql);
        return result[0];
    },
    insertUser: async (salt, hashedPassword, user_name, user_email) => {
        const sql = `INSERT INTO user(user_name,user_email,password,salt) VALUES('${user_name}','${user_email}','${hashedPassword}','${salt}')`
        const result = await pool.execute(sql);
        return result;
    },
    deleteUser: async (user_id) => {
        const sql = `DELETE FROM user WEHRE user_id='${user_id}'`;
        const result = await pool.execute(sql);
        return result;
    }
}