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
        const sql = `select * from Book`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getAuthor: async () => {
        const sql = `select * from Author`;
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
        const sql = `select BasketID, User_Email, Book_ISBN, Number from Shopping_basket`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBasket: async (user) => {
        const sql = `select Book_ISBN, BasketID, DATE_FORMAT(OrderDate, '%Y-%m-%d') AS OrderDate, Number 
                    from shopping_basket where User_Email='${user}'`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getReservation: async (user) => {
        const sql = `select Book_ISBN, RID, DATE_FORMAT(OrderDate, '%Y-%m-%d') AS OrderDate, PickupTime 
                    from reservation where User_Email='${user}'`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToBook: async (Title) => {
        const sql = `SELECT 
    b.ISBN, 
    b.Year, 
    b.Title, 
    b.Price, 
    b.Category, 
    a.Name AS Author_Name, 
    COALESCE(SUM(i.Number), 0) AS Number
FROM 
    Book b
JOIN 
    Author a ON b.Author_Name = a.Name
LEFT JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    b.Title = '${Title}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name;
`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToAuthor: async (Name) => {
        const sql = `SELECT 
    b.ISBN, 
    b.Year, 
    b.Title, 
    b.Price, 
    b.Category, 
    a.Name AS Author_Name, 
    COALESCE(SUM(i.Number), 0) AS Number
FROM 
    Book b
JOIN 
    Author a ON b.Author_Name = a.Name
LEFT JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    a.Name = '${Name}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name;
`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToAward: async (Name) => {
        const sql = `SELECT 
    b.ISBN, 
    b.Year, 
    b.Title, 
    b.Price, 
    b.Category, 
    a.Name AS Author_Name,     COALESCE(SUM(i.Number), 0) AS Number
FROM 
    Award aw
JOIN 
    Book b ON aw.Book_ISBN = b.ISBN
JOIN 
    Author a ON b.Author_Name = a.Name
LEFT JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    aw.Name = '${Name}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name;
`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    setIsolationLevel: async (Name) => {
        const sql = `set transaction isolation level REPEATABLE READ`;
        await promisePool.query(sql);
    },
    setLog: async (Name) => {
        let sql = `SET GLOBAL slow_query_log = 'ON'`;
        await promisePool.query(sql);

        sql = `SET GLOBAL long_query_time = 2`;
        await promisePool.query(sql);

        sql = `SET GLOBAL general_log = 'OFF'`;
        await promisePool.query(sql);
    },
}

export const insertSql = {
    insertAuthor: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Author (Name, Address, URL) VALUES (?, ?, ?)`,
                values: [data.Name, data.Address, data.URL]
            }
        ];
        return exception(queries);
    },
    insertBook: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Book (ISBN, Year, Title, Price, Category, Author_Name) VALUES (?, ?, ?, ?, ?, ?)`,
                values: [data.ISBN, data.Year, data.Title, data.Price, data.Category, data.AuthorName]
            }
        ];
        return exception(queries);
    },
    insertAward: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Award (Name, Year, Book_ISBN) VALUES (?, ?, ?)`,
                values: [data.Name, data.Year, data.Book_ISBN]
            }
        ];
        return exception(queries);
    },
    insertWarehouse: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Warehouse (Code, PhoneNum, Address) VALUES (?, ?, ?)`,
                values: [data.Code, data.PhoneNum, data.Address]
            }
        ];
        return exception(queries);
    },
    insertInventory: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Inventory (Warehouse_Code, Book_ISBN, Number) VALUES (?, ?, ?)`,
                values: [data.Warehouse_Code, data.Book_ISBN, data.Number]
            }
        ];
        return exception(queries);
    },
    insertContains: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Shopping_basket (BasketID, User_Email, Book_ISBN, Number, OrderDate) VALUES (?, ?, ?, ?, ?)`,
                values: [data.BasketID, data.User_Email, data.Book_ISBN, data.Number, null]
            }
        ];
        return exception(queries);
    },
    insertBasket: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Shopping_basket (User_Email, Book_ISBN, Number, OrderDate) VALUES (?, ?, ?, ?)`,
                values: [data.User_Email, data.Book_ISBN, data.Number, null]
            }
        ];
        return exception(queries);
    },
    insertReservation: async (data) => {
        const queries = [
            {
                sql: `INSERT INTO Reservation (Book_ISBN, User_Email, OrderDate, PickupTime) VALUES (?, ?, ?, ?)`,
                values: [data.Book_ISBN, data.User_Email, data.Date, data.Time]
            }
        ];
        return exception(queries);
    },
};

export const updateSql = {
    updateBook: async (data) => {
        const queries = [
            {
                sql: `UPDATE Book SET Year = ?, Title = ?, Price = ?, Category = ?, Author_Name = ? WHERE ISBN = ?`,
                values: [data.Year, data.Title, data.Price, data.Category, data.Author_Name, data.ISBN]
            }
        ];
        return exception(queries);
    },
    updateAuthor: async (data) => {
        const queries = [
            {
                sql: `UPDATE Author SET Address = ?, URL = ? WHERE Name = ?`,
                values: [data.Address, data.URL, data.Name]
            }
        ];
        return exception(queries);
    },
    updateAward: async (data) => {
        const queries = [
            {
                sql: `UPDATE Award SET Year = ?, Book_ISBN = ? WHERE Name = ?`,
                values: [data.Year, data.Book_ISBN, data.Name]
            }
        ];
        return exception(queries);
    },
    updateWarehouse: async (data) => {
        const queries = [
            {
                sql: `UPDATE Warehouse SET PhoneNum = ?, Address = ? WHERE Code = ?`,
                values: [data.PhoneNum, data.Address, data.Code]
            }
        ];
        return exception(queries);
    },
    updateInventory: async (data) => {
        const queries = [
            {
                sql: `UPDATE Inventory SET Book_ISBN = ?, Number = ? WHERE Warehouse_Code = ?`,
                values: [data.Book_ISBN, data.Number, data.Warehouse_Code]
            }
        ];
        return exception(queries);
    },
    updateContains: async (data) => {
        const queries = [
            {
                sql: `UPDATE Shopping_basket SET Number = ? WHERE User_Email = ? AND Book_ISBN = ? AND BasketID = ?`,
                values: [data.Number, data.User_Email, data.Book_ISBN, data.BasketID]
            }
        ];
        return exception(queries);
    },
    updateReservation: async (data) => {
        const queries = [
            {
                sql: `UPDATE Reservation SET OrderDate = ?, PickupTime = ? WHERE User_Email = ? AND Book_ISBN = ? AND RID = ?`,
                values: [data.Date, data.Time, data.user, data.ISBN, data.RID]
            }
        ];
        return exception(queries);
    },
    updateBasket: async (data) => {
        const queries = [
            {
                sql: `UPDATE Shopping_basket SET OrderDate = ? WHERE User_Email = ? AND Book_ISBN = ? AND BasketID = ?`,
                values: [data.Date, data.user, data.Book_ISBN, data.BasketID]
            }
        ];
        return exception(queries);
    },
};

export const deleteSql = {
    deleteBook: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Book WHERE ISBN = ?`,
                values: [data.ISBN]
            }
        ];
        return exception(queries);
    },
    deleteAuthor: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Author WHERE Name = ?`,
                values: [data.Name]
            }
        ];
        return exception(queries);
    },
    deleteAward: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Award WHERE Name = ? AND Year = ?`,
                values: [data.Name, data.Year]
            }
        ];
        return exception(queries);
    },
    deleteWarehouse: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Warehouse WHERE Code = ?`,
                values: [data.Code]
            }
        ];
        return exception(queries);
    },
    deleteInventory: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Inventory WHERE Warehouse_Code = ? AND Book_ISBN = ?`,
                values: [data.Warehouse_Code, data.Book_ISBN]
            }
        ];
        return exception(queries);
    },
    deleteContains: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Shopping_basket WHERE BasketID = ? AND User_Email = ? AND Book_ISBN = ?`,
                values: [data.BasketID, data.User_Email, data.Book_ISBN]
            }
        ];
        return exception(queries);
    },
    deleteReservation: async (data) => {
        const queries = [
            {
                sql: `DELETE FROM Reservation WHERE User_Email = ? AND Book_ISBN = ? AND RID = ?`,
                values: [data.user, data.ISBN, data.RID]
            }
        ];
        return exception(queries);
    },
};

async function exception(queries) {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        for (const query of queries) {
            const { sql, values } = query;
            await connection.query(sql, values);
        }

        await connection.commit();
        return 'success';
    } catch (error) {
        await connection.rollback();
        console.error('Transaction error:', error.sqlMessage);
        return error.sqlMessage;
    } finally {
        connection.release();
    }
}