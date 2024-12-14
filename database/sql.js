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
        const sql = `select * from shopping_basket`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBasket: async () => {
        const sql = `select Book_ISBN, BasketID, OrderDate, Number from shopping_basket`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getReservation: async () => {
        const sql = `select Book_ISBN, RID, OrderDate, PickupTime from reservation`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToBook: async (Title) => {
        const sql = `select ISBN, Year, Title, Price, Category, Author.Name from Book, Author where Author_ID = ID`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToAuthor: async (Name) => {
        const sql = `select ISBN, Year, Title, Price, Category, Author.Name from Book, Author where Author_ID = ID`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBookToAward: async (Name) => {
        const sql = `select ISBN, Year, Title, Price, Category, Author.Name from Book, Author where Author_ID = ID`;
        const [result] = await promisePool.query(sql);
        return result;
    },
}

export const insertSql = {
    insertAuthor: async (data) => {
        const sql = `INSERT INTO Author (Name, Address, URL) VALUES 
                    ('${data.Name}', '${data.Address}', '${data.URL}')`;
        return exception(sql);
    },
    insertBook: async (data) => {
        const sql = `INSERT INTO Book (ISBN, Year, Title, Price, Category, Author_ID) VALUES 
            (${data.ISBN}, ${data.Year}, '${data.Title}', ${data.Price}, '${data.Category}', ${data.Author_ID})`;
        return exception(sql);
    },
    insertAward: async (data) => {
        const sql = `INSERT INTO Award (Name, Year, Book_ISBN, Author_ID) VALUES 
                    ('${data.Name}', ${data.Year}, ${data.Book_ISBN}, ${data.Author_ID})`;
        return exception(sql);
    },
    insertWarehouse: async (data) => {
        const sql = `INSERT INTO Warehouse (Code, PhoneNum, Address) VALUES 
                    (${data.Code}, '${data.PhoneNum}', '${data.Address}')`;
        return exception(sql);
    },
    insertInventory: async (data) => {
        const sql = `INSERT INTO Inventory (Warehouse_Code, Book_ISBN, Number) VALUES 
                    (${data.Warehouse}, ${data.Book}, ${data.Number})`;
        return exception(sql);
    },
    insertContains: async (data) => {
        const sql = `INSERT INTO shopping_basket (Customer_ID, BasketID, Book_ISBN, Number) VALUES 
                    (${data.Customer_ID}, ${data.BasketID}, ${data.Book_ISBN}, ${data.Number})`;
        return exception(sql);
    },
};

export const updateSql = {
    updateBook: async (data) => {
        const sql = `UPDATE Book
                        SET 
                            Year = ${data.Year},
                            Title = '${data.Title}',
                            Price = ${data.Price},
                            Category = '${data.Category}',
                            Author_ID = ${data.Author_ID}
                        WHERE 
                            ISBN = ${data.ISBN};
                        `;
        return exception(sql);
    },
    updateAuthor: async (data) => {
        const sql = `UPDATE Author
                        SET 
                            Name = '${data.Name}',
                            Address = '${data.Address}',
                            URL = '${data.URL}'
                        WHERE 
                            ID = ${data.ID};
                        `;
        return exception(sql);
    },
    updateAward: async (data) => {
        const sql = `UPDATE Award
                        SET 
                            Name = '${data.Name}',
                            Year = ${data.Year},
                            Book_ISBN = ${data.Book_ISBN},
                            Author_ID = ${data.Author_ID}
                        WHERE 
                            ID = ${data.ID};
                        `;
        return exception(sql);
    },
    updateWarehouse: async (data) => {
        const sql = `UPDATE Warehouse
                        SET 
                            PhoneNum = '${data.PhoneNum}',
                            Address = '${data.Address}'
                        WHERE 
                            Code = ${data.Code};
                        `;
        return exception(sql);
    },
    updateInventory: async (data) => {
        const sql = `UPDATE Inventory
                        SET 
                            Book_ISBN = ${data.Book_ISBN},
                            Number = ${data.Number}
                        WHERE 
                            Warehouse_Code = ${data.Warehouse_Code};
                        `;
        return exception(sql);
    },
    updateContains: async (data) => {
        const sql = `UPDATE Shopping_Basket
                        SET 
                            Number = ${data.Number}
                        WHERE 
                            Customer_ID = ${data.Customer_ID} AND Book_ISBN = ${data.Book_ISBN} AND BasketID = ${data.BasketID};
                        `;
        return exception(sql);
    },
};

export const deleteSql = {
    deleteBook: async (data) => {
        const sql = `DELETE FROM Book WHERE ISBN=${data.ISBN}`;
        return exception(sql);
    },
    deleteAuthor: async (data) => {
        const sql = `DELETE FROM Author WHERE ID=${data.ID}`;
        return exception(sql);
    },
    deleteAward: async (data) => {
        const sql = `DELETE FROM Award WHERE ID=${data.ID}`;
        return exception(sql);
    },
    deleteWarehouse: async (data) => {
        const sql = `DELETE FROM Warehouse WHERE Code=${data.Code}`;
        return exception(sql);
    },
    deleteInventory: async (data) => {
        const sql = `DELETE FROM Inventory WHERE Warehouse_Code=${data.Warehouse_Code}`;
        return exception(sql);
    },
    deleteContains: async (data) => {
        const sql = `DELETE FROM Shopping_basket WHERE ISBN=${data.ISBN}`;
        return exception(sql);
    },
};

async function exception(sql) {
    try {
        await promisePool.query(sql);
    } catch (error) {
        return error.sqlMessage;
    }
    return 'success';
}
