-- Insert data into Author
INSERT INTO `DB_Proj`.`Author` (`Name`, `Address`, `URL`)
VALUES 
('JohnDoe', '123 Maple St', 'www.johndoe.com'),
('JaneSmith', '456 Oak St', 'www.janesmith.com'),
('AliceBrown', '789 Pine St', 'www.alicebrown.com'),
('BobWhite', '101 Birch St', 'www.bobwhite.com'),
('CarolGreen', '202 Cedar St', 'www.carolgreen.com');

-- Insert data into Book
INSERT INTO `DB_Proj`.`Book` (`ISBN`, `Year`, `Title`, `Price`, `Category`, `Author_Name`)
VALUES
(11111, 2020, 'Book One', 200, 'Fiction', 'JohnDoe'),
(22222, 2021, 'Book Two', 150, 'Non-Fiction', 'JaneSmith'),
(33333, 2019, 'Book Three', 300, 'Science', 'AliceBrown'),
(44444, 2023, 'Book Four', 250, 'Fantasy', 'BobWhite'),
(55555, 2022, 'Book Five', 180, 'Mystery', 'CarolGreen');

-- Insert data into Award
INSERT INTO `DB_Proj`.`Award` (`Name`, `Year`, `Book_ISBN`)
VALUES
('Best Fiction', 2020, 11111),
('Top Science Book', 2019, 33333),
('Readers Choice', 2021, 22222),
('Fantasy Award', 2023, 44444),
('Mystery Prize', 2022, 55555);

-- Insert data into Warehouse
INSERT INTO `DB_Proj`.`Warehouse` (`Code`, `PhoneNum`, `Address`)
VALUES
(1, '555-1234', '100 Elm St'),
(2, '555-5678', '200 Ash St'),
(3, '555-9101', '300 Spruce St'),
(4, '555-1121', '400 Fir St'),
(5, '555-3141', '500 Redwood St');

-- Insert data into Inventory
INSERT INTO `DB_Proj`.`Inventory` (`Warehouse_Code`, `Book_ISBN`, `Number`)
VALUES
(1, 11111, 10),
(2, 22222, 15),
(3, 33333, 20),
(4, 44444, 5),
(5, 55555, 8);

-- Insert data into User
INSERT INTO `DB_Proj`.`User` (`Email`, `PhoneNum`, `Address`, `Name`, `Password`, `Type`)
VALUES
('user1@example.com', '555-1111', '111 Main St', 'User One', 1234, 'Customer'),
('user2@example.com', '555-2222', '222 Main St', 'User Two', 5678, 'Customer'),
('user3@example.com', '555-3333', '333 Main St', 'User Three', 9101, 'Admin'),
('user4@example.com', '555-4444', '444 Main St', 'User Four', 1121, 'Customer'),
('user5@example.com', '555-5555', '555 Main St', 'User Five', 3141, 'Admin');

-- Insert data into Reservation
INSERT INTO `DB_Proj`.`Reservation` (`RID`, `Book_ISBN`, `User_Email`, `OrderDate`, `PickupTime`)
VALUES
(1, 11111, 'user1@example.com', '2024-12-16', '10:00:00'),
(2, 22222, 'user2@example.com', '2024-12-17', '11:00:00'),
(3, 33333, 'user3@example.com', '2024-12-18', '12:00:00'),
(4, 44444, 'user4@example.com', '2024-12-19', '13:00:00'),
(5, 55555, 'user5@example.com', '2024-12-20', '14:00:00');

-- Insert data into Shopping_basket
INSERT INTO `DB_Proj`.`Shopping_basket` (`BasketID`, `User_Email`, `Book_ISBN`, `Number`, `OrderDate`)
VALUES
(1, 'user1@example.com', 11111, 2, '2024-12-16'),
(2, 'user2@example.com', 22222, 1, '2024-12-17'),
(3, 'user3@example.com', 33333, 3, NULL),
(4, 'user4@example.com', 44444, 1, '2024-12-19'),
(5, 'user5@example.com', 55555, 4, '2024-12-20');
