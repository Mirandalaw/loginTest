const pool = require('./db');

module.exports = {
    createSchema: async () => {
        const sql = `CREATE TABLE users (
            user_uuid VARCHAR(128) NOT NULL COMMENT '유저 uuid',
            user_name VARCHAR(30) NOT NULL COMMENT '유저 이름',
            user_email VARCHAR(50) NOT NULL COMMENT '유저 이메일',
            password VARCHAR(128) NOT NULL COMMENT '패스워드(SHA 512)',
            phone_number VARCHAR(30) NOT NULL COMMENT '핸드폰 번호',
            salt VARCHAR(128) NOT NULL COMMENT '솔트값'
        )`;
        const result = await pool.execute(sql);
        return result;
    }
    ,
    findOne: async (user_email) => {
        const sql = `SELECT * FROM users WHERE user_email ='${user_email}'`
        const result = await pool.execute(sql);
        return result[0];
    },
    findAll: async () => {
        const sql = 'SELECT * FROM users';
        const result = await pool.execute(sql);
        return result[0];
    },
    insertUser: async (user_uuid, salt, hashedPassword, user_name, user_email, phone_number) => {
        const sql = `INSERT INTO users(user_uuid,user_name,user_email,password,phone_number,salt) VALUES('${user_uuid}','${user_name}','${user_email}','${hashedPassword}','${phone_number}','${salt}')`
        const result = await pool.execute(sql);
        return result;
    },
    deleteUser: async (user_email) => {
        const sql = `DELETE FROM users WHERE user_email = '${user_email}'`;
        const result = await pool.execute(sql);
        return result[0];
    }
}