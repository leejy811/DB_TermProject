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
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  `URL` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Book` (
  `ISBN` INT NOT NULL,
  `Year` YEAR(4) NOT NULL,
  `Title` VARCHAR(45) NOT NULL,
  `Price` INT NOT NULL,
  `Category` VARCHAR(45) NOT NULL,
  `Author_ID` INT NOT NULL,
  PRIMARY KEY (`ISBN`),
  INDEX `fk_Book_Author_idx` (`Author_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Book_Author`
    FOREIGN KEY (`Author_ID`)
    REFERENCES `DB_Proj`.`Author` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Award`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Award` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Year` YEAR(4) NOT NULL,
  `Book_ISBN` INT NOT NULL,
  `Author_ID` INT NOT NULL,
  INDEX `fk_Award_Book1_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_Award_Author1_idx` (`Author_ID` ASC) VISIBLE,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_Award_Book1`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Award_Author1`
    FOREIGN KEY (`Author_ID`)
    REFERENCES `DB_Proj`.`Author` (`ID`)
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
  PRIMARY KEY (`Code`))
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
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Email` CHAR(45) NOT NULL,
  `PhoneNum` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Password` INT NOT NULL,
  `Type` CHAR(10) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Shopping_Basket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Shopping_Basket` (
  `Customer_ID` INT NOT NULL,
  `BasketID` INT NOT NULL,
  `Book_ISBN` INT NOT NULL,
  `OrderDate` DATE NULL,
  `Number` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`Customer_ID`, `BasketID`),
  INDEX `fk_Customer_has_Book_Book1_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_Customer_has_Book_Customer1_idx` (`Customer_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Customer_has_Book_Customer1`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `DB_Proj`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Customer_has_Book_Book1`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Proj`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_Proj`.`Reservation` (
  `Customer_ID` INT NOT NULL,
  `Book_ISBN` INT NOT NULL,
  `RID` INT NOT NULL,
  `OrderDate` DATE NULL,
  `PickupTime` TIME NULL,
  PRIMARY KEY (`Customer_ID`, `Book_ISBN`),
  INDEX `fk_Customer_has_Book_Book2_idx` (`Book_ISBN` ASC) VISIBLE,
  INDEX `fk_Customer_has_Book_Customer2_idx` (`Customer_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Customer_has_Book_Customer2`
    FOREIGN KEY (`Customer_ID`)
    REFERENCES `DB_Proj`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Customer_has_Book_Book2`
    FOREIGN KEY (`Book_ISBN`)
    REFERENCES `DB_Proj`.`Book` (`ISBN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
