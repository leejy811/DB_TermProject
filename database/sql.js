import mysql from 'mysql2';

require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'leejy811',
    database: 'DB_Proj',
});

const promisePool = pool.promise();

export const selectSql = {
    getUser: async () => {
        const sql = `select * from User`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBook: async () => {
        const sql = `select ISBN, Year, Title, Price, Category, Author.Name from Book, Author where Author_ID = ID`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getAuthor: async () => {
        const sql = `select Name, Address, URL from Author`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getAward: async () => {
        const sql = `select * from Award`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getWarehouse: async () => {
        const sql = `select * from Warehouse`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getInventory: async () => {
        const sql = `select * from Inventory`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getContains: async () => {
        const sql = `select Customer_ID, Book_ISBN, Number from shopping_basket`;
        const [result] = await promisePool.query(sql);
        return result;
    },
}

export const deleteSql = {
    deleteDepartment: async (data) => {
        console.log('delete department Dnumber =', data);
        const sql = `delete from department where Dnumber=${data.Dnumber}`
        console.log(sql);
        await promisePool.query(sql);
    },
};
