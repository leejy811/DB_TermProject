-- Insert data into Author table
INSERT INTO `DB_Proj`.`Author` (`Name`, `Address`, `URL`) VALUES
('Author A', 'Address A', 'http://authora.com'),
('Author B', 'Address B', 'http://authorb.com'),
('Author C', 'Address C', 'http://authorc.com'),
('Author D', 'Address D', 'http://authord.com'),
('Author E', 'Address E', 'http://authore.com');

-- Insert data into Book table
INSERT INTO `DB_Proj`.`Book` (`ISBN`, `Year`, `Title`, `Price`, `Category`, `Author_ID`) VALUES
(1111, 2020, 'Book A', 500, 'Fiction', 1),
(2222, 2021, 'Book B', 600, 'Non-Fiction', 2),
(3333, 2019, 'Book C', 450, 'Science', 3),
(4444, 2022, 'Book D', 700, 'Fantasy', 4),
(5555, 2018, 'Book E', 550, 'Horror', 5);

-- Insert data into Award table
INSERT INTO `DB_Proj`.`Award` (`Book_ISBN`, `Name`, `Year`) VALUES
(1111, 'Best Fiction', 2021),
(2222, 'Readers Choice', 2022),
(3333, 'Science Excellence', 2020),
(4444, 'Fantasy Award', 2023),
(5555, 'Horror Masterpiece', 2019);

-- Insert data into Warehouse table
INSERT INTO `DB_Proj`.`Warehouse` (`Code`, `PhoneNum`, `Address`) VALUES
(1, '123-456-7890', 'Warehouse A'),
(2, '234-567-8901', 'Warehouse B'),
(3, '345-678-9012', 'Warehouse C'),
(4, '456-789-0123', 'Warehouse D'),
(5, '567-890-1234', 'Warehouse E');

-- Insert data into Inventory table
INSERT INTO `DB_Proj`.`Inventory` (`Warehouse_Code`, `Book_ISBN`, `Number`) VALUES
(1, 1111, 10),
(2, 2222, 15),
(3, 3333, 20),
(4, 4444, 25),
(5, 5555, 30);

-- Insert data into User table
INSERT INTO `DB_Proj`.`User` (`Email`, `PhoneNum`, `Address`, `Name`, `Password`, `Type`) VALUES
('admin@example.com', '987-654-3210', 'Admin Address A', 'Admin', 1234, 'Admin'),
('user1@example.com', '987-654-3210', 'User Address A', 'User A', 1234, 'Customer'),
('user2@example.com', '876-543-2109', 'User Address B', 'User B', 2345, 'Customer'),
('user3@example.com', '765-432-1098', 'User Address C', 'User C', 3456, 'Customer'),
('user4@example.com', '654-321-0987', 'User Address D', 'User D', 4567, 'Customer'),
('user5@example.com', '543-210-9876', 'User Address E', 'User E', 5678, 'Customer');

-- Insert data into Shopping_Basket table
INSERT INTO `DB_Proj`.`Shopping_Basket` (`Customer_ID`, `BasketID`, `Book_ISBN`, `OrderDate`, `Number`) VALUES
(1, 101, 1111, '2024-12-01', 2),
(2, 102, 2222, '2024-12-02', 1),
(3, 103, 3333, '2024-12-03', 3),
(4, 104, 4444, '2024-12-04', 1),
(5, 105, 5555, '2024-12-05', 4);

-- Insert data into Reservation table
INSERT INTO `DB_Proj`.`Reservation` (`Customer_ID`, `Book_ISBN`, `RID`, `OrderDate`, `PickupTime`, `Reservationcol`) VALUES
(1, 1111, 201, '2024-12-06', '10:00:00', 'Reserved'),
(2, 2222, 202, '2024-12-07', '11:00:00', 'Reserved'),
(3, 3333, 203, '2024-12-08', '12:00:00', 'Reserved'),
(4, 4444, 204, '2024-12-09', '13:00:00', 'Reserved'),
(5, 5555, 205, '2024-12-10', '14:00:00', 'Reserved');
