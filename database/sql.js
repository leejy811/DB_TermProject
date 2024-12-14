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
    SUM(i.Number) AS Total_Quantity
FROM 
    Book b
JOIN 
    Author a ON b.Author_Name = a.Name
JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    b.Title = '${Title}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name`;
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
    SUM(i.Number) AS Total_Quantity
FROM 
    Book b
JOIN 
    Author a ON b.Author_Name = a.Name
JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    a.Name = '${Name}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name`;
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
    a.Name AS Author_Name, 
    SUM(i.Number) AS Total_Quantity
FROM 
    Book b
JOIN 
    Author a ON b.Author_Name = a.Name
JOIN 
    Award aw ON b.ISBN = aw.Book_ISBN
JOIN 
    Inventory i ON b.ISBN = i.Book_ISBN
WHERE 
    aw.Name = '${Name}'
GROUP BY 
    b.ISBN, b.Year, b.Title, b.Price, b.Category, a.Name`;
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
        const sql = `INSERT INTO Book (ISBN, Year, Title, Price, Category, Author_Name) VALUES 
            (${data.ISBN}, ${data.Year}, '${data.Title}', ${data.Price}, '${data.Category}', '${data.AuthorName}')`;
        return exception(sql);
    },
    insertAward: async (data) => {
        const sql = `INSERT INTO Award (Name, Year, Book_ISBN) VALUES 
                    ('${data.Name}', ${data.Year}, ${data.Book_ISBN})`;
        return exception(sql);
    },
    insertWarehouse: async (data) => {
        const sql = `INSERT INTO Warehouse (Code, PhoneNum, Address) VALUES 
                    (${data.Code}, '${data.PhoneNum}', '${data.Address}')`;
        return exception(sql);
    },
    insertInventory: async (data) => {
        const sql = `INSERT INTO Inventory (Warehouse_Code, Book_ISBN, Number) VALUES 
                    (${data.Warehouse_Code}, ${data.Book_ISBN}, ${data.Number})`;
        return exception(sql);
    },
    insertContains: async (data) => {
        const sql = `INSERT INTO Shopping_basket (BasketID, User_Email, Book_ISBN, Number, OrderDate) VALUES 
                    (${data.BasketID}, '${data.User_Email}', ${data.Book_ISBN}, ${data.Number}, NULL)`;
        return exception(sql);
    },
    insertBasket: async (data) => {
        const sql = `INSERT INTO Shopping_basket (User_Email, Book_ISBN, Number, OrderDate) VALUES 
                    ('${data.User_Email}', ${data.Book_ISBN}, ${data.Number}, NULL)`;
                    console.log(sql);
        return exception(sql);
    },
    insertReservation: async (data) => {
        const sql = `INSERT INTO Reservation (Book_ISBN, User_Email, OrderDate, PickupTime) VALUES 
                    (${data.Book_ISBN}, '${data.User_Email}', '${data.Date}', '${data.Time}')`;
                    console.log(sql);
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
                            Book_ISBN = ${data.Book_ISBN}
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
        const sql = `UPDATE Shopping_basket
                        SET 
                            Number = ${data.Number}
                        WHERE 
                            User_Email = '${data.User_Email}' AND Book_ISBN = ${data.Book_ISBN} AND BasketID = ${data.BasketID};
                        `;
        return exception(sql);
    },
    updateReservation: async (data) => {
        const sql = `UPDATE Reservation
                        SET 
                            OrderDate = '${data.Date}',
                            PickupTime = '${data.Time}'
                        WHERE 
                            User_Email = '${data.user}' AND Book_ISBN = ${data.ISBN} AND RID = ${data.RID};
                        `;
        return exception(sql);
    },
    updateBasket: async (data) => {
        const sql = `UPDATE Shopping_basket
                        SET 
                            OrderDate = '${data.Date}'
                        WHERE 
                            User_Email = '${data.user}' AND Book_ISBN = ${data.Book_ISBN} AND BasketID = ${data.BasketID};
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
        const sql = `DELETE FROM Author WHERE Name='${data.Name}'`;
        return exception(sql);
    },
    deleteAward: async (data) => {
        const sql = `DELETE FROM Award WHERE Name='${data.Name}' AND Year=${data.Year}`;
        return exception(sql);
    },
    deleteWarehouse: async (data) => {
        const sql = `DELETE FROM Warehouse WHERE Code=${data.Code}`;
        return exception(sql);
    },
    deleteInventory: async (data) => {
        const sql = `DELETE FROM Inventory WHERE Warehouse_Code=${data.Warehouse_Code} AND Book_ISBN=${data.Book_ISBN}`;
        return exception(sql);
    },
    deleteContains: async (data) => {
        const sql = `DELETE FROM Shopping_basket WHERE BasketID=${data.BasketID} AND User_Email='${data.User_Email}' AND Book_ISBN=${data.Book_ISBN}`;
        return exception(sql);
    },
    deleteReservation: async (data) => {
        const sql = `DELETE FROM Reservation WHERE User_Email = '${data.user}' AND Book_ISBN = ${data.ISBN} AND RID = ${data.RID}`;
        console.log(sql);
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
