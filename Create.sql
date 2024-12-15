-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DB_Proj
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DB_Proj
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DB_Proj` DEFAULT CHARACTER SET utf8 ;
USE `DB_Proj` ;

-- -----------------------------------------------------
-- Table `DB_Proj`.`Author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Author` (
  `Name` CHAR(15) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  `URL` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Book` (
  `ISBN` INT NOT NULL,
  `Year` YEAR(4) NOT NULL,
  `Title` CHAR(20) NOT NULL,
  `Price` INT NOT NULL,
  `Category` VARCHAR(45) NOT NULL,
  `Author_Name` CHAR(15) NOT NULL,
  PRIMARY KEY (`ISBN`),
  INDEX `fk_Book_Author1_idx` (`Author_Name` ASC) VISIBLE,
  UNIQUE INDEX `Title_UNIQUE` (`Title` ASC) VISIBLE,
  CONSTRAINT `fk_Book_Author1`
    FOREIGN KEY (`Author_Name`)
    REFERENCES `DB_Proj`.`Author` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Award`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Award` (
  `Name` VARCHAR(45) NOT NULL,
  `Year` YEAR(4) NOT NULL,
  `Book_ISBN` INT NOT NULL,
  PRIMARY KEY (`Name`, `Year`),
  INDEX `fk_Award_Book1_idx` (`Book_ISBN` ASC) VISIBLE,
  CONSTRAINT `fk_Award_Book1`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Warehouse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Warehouse` (
  `Code` INT NOT NULL,
  `PhoneNum` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Code`),
  UNIQUE INDEX `Address_UNIQUE` (`Address` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Inventory` (
  `Warehouse_Code` INT NOT NULL,
  `Book_ISBN` INT NOT NULL,
  `Number` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`Warehouse_Code`, `Book_ISBN`),
  INDEX `fk_Warehouse_has_Book_Book1_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_Warehouse_has_Book_Warehouse1_idx` (`Warehouse_Code` ASC) VISIBLE,
  CONSTRAINT `fk_Warehouse_has_Book_Warehouse1`
    FOREIGN KEY (`Warehouse_Code`)
    REFERENCES `DB_Proj`.`Warehouse` (`Code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Warehouse_has_Book_Book1`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`User` (
  `Email` CHAR(30) NOT NULL,
  `PhoneNum` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Password` INT NOT NULL,
  `Type` CHAR(10) NOT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE,
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Reservation` (
  `RID` INT NOT NULL AUTO_INCREMENT,
  `Book_ISBN` INT NOT NULL,
  `User_Email` CHAR(30) NOT NULL,
  `OrderDate` DATE NOT NULL,
  `PickupTime` TIME NOT NULL,
  PRIMARY KEY (`RID`, `Book_ISBN`, `User_Email`),
  INDEX `fk_Customer_has_Book_Book2_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_Reservation_User1_idx` (`User_Email` ASC) VISIBLE,
  CONSTRAINT `fk_Customer_has_Book_Book2`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_User1`
    FOREIGN KEY (`User_Email`)
    REFERENCES `DB_Proj`.`User` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Shopping_basket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Shopping_basket` (
  `BasketID` INT NOT NULL AUTO_INCREMENT,
  `User_Email` CHAR(30) NOT NULL,
  `Book_ISBN` INT NOT NULL,
  `Number` INT UNSIGNED NOT NULL DEFAULT 0,
  `OrderDate` DATE NULL,
  PRIMARY KEY (`BasketID`, `User_Email`, `Book_ISBN`),
  INDEX `fk_User_has_Book_Book1_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_User_has_Book_User1_idx` (`User_Email` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Book_User1`
    FOREIGN KEY (`User_Email`)
    REFERENCES `DB_Proj`.`User` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Book_Book1`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `DB_Proj`;

DELIMITER $$
USE `DB_Proj`$$
CREATE DEFINER = CURRENT_USER TRIGGER `DB_Proj`.`Reservation_BEFORE_INSERT` BEFORE INSERT ON `Reservation` FOR EACH ROW
BEGIN
    DECLARE reservation_exists INT;

    SELECT COUNT(*)
    INTO reservation_exists
    FROM Reservation
    WHERE 
        OrderDate = NEW.OrderDate -- 날짜가 동일해야 함
        AND ABS(TIMESTAMPDIFF(MINUTE, PickupTime, NEW.PickupTime)) < 10;

    IF reservation_exists > 0 THEN
		SIGNAL SQLSTATE '23001'
		SET MESSAGE_TEXT = 'PickupTime within 10 minutes already exists for the same date.';
    END IF;
END$$

USE `DB_Proj`$$
CREATE DEFINER = CURRENT_USER TRIGGER `DB_Proj`.`Reservation_BEFORE_UPDATE` BEFORE UPDATE ON `Reservation` FOR EACH ROW
BEGIN
    DECLARE reservation_exists INT;

    SELECT COUNT(*)
    INTO reservation_exists
    FROM Reservation
    WHERE 
        OrderDate = NEW.OrderDate -- 날짜가 동일해야 함
        AND ABS(TIMESTAMPDIFF(MINUTE, PickupTime, NEW.PickupTime)) < 10
        AND RID != NEW.RID; -- 현재 업데이트 중인 레코드는 제외

    IF reservation_exists > 0 THEN
		SIGNAL SQLSTATE '23001'
		SET MESSAGE_TEXT = 'PickupTime within 10 minutes already exists for the same date.';
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
