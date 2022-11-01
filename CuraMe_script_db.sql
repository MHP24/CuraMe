SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema curame_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `curame_db` ;

-- -----------------------------------------------------
-- Schema curame_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `curame_db` DEFAULT CHARACTER SET utf8 ;
USE `curame_db` ;

-- -----------------------------------------------------
-- Table `curame_db`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`region` (
  `id_region` INT NOT NULL,
  `nombre_region` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_region`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`provincia` (
  `id_provincia` INT NOT NULL,
  `nombre_provincia` VARCHAR(45) NOT NULL,
  `id_region` INT NOT NULL,
  PRIMARY KEY (`id_provincia`),
  CONSTRAINT `fk_provincia_region`
    FOREIGN KEY (`id_region`)
    REFERENCES `curame_db`.`region` (`id_region`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`comuna`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`comuna` (
  `id_comuna` INT NOT NULL,
  `nombre_comuna` VARCHAR(45) NOT NULL,
  `id_provincia` INT NOT NULL,
  PRIMARY KEY (`id_comuna`),
  CONSTRAINT `fk_comuna_provincia`
    FOREIGN KEY (`id_provincia`)
    REFERENCES `curame_db`.`provincia` (`id_provincia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `curame_db`.`sucursal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`sucursal` (
  `id_sucursal` INT NOT NULL,
  `direccion` VARCHAR(60) NOT NULL,
  `id_comuna` INT NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  CONSTRAINT `fk_sucursal_comuna`
    FOREIGN KEY (`id_comuna`)
    REFERENCES `curame_db`.`comuna` (`id_comuna`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`medio_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`medio_pago` (
  `id_medio_pago` INT NOT NULL,
  `nombre_medio_pago` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_medio_pago`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`usuario` (
  `rut` INT NOT NULL,
  `rol` INT NOT NULL,
  `nombre` VARCHAR(60) NOT NULL,
  `apellido` VARCHAR(60) NOT NULL,
  `telefono` INT NULL,
  `email` VARCHAR(80) NOT NULL,
  `contrasena` VARCHAR(250) NOT NULL,
  `direccion` VARCHAR(80) NOT NULL,
  `id_comuna` INT NOT NULL,
  PRIMARY KEY (`rut`),
  CONSTRAINT `fk_usuario_comuna`
    FOREIGN KEY (`id_comuna`)
    REFERENCES `curame_db`.`comuna` (`id_comuna`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`prevision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`prevision` (
  `id_prevision` INT NOT NULL,
  `nombre_prevision` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_prevision`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`paciente` (
  `id_paciente` INT NOT NULL AUTO_INCREMENT,
  `id_prevision` INT NOT NULL,
  `rut` INT NOT NULL,
  PRIMARY KEY (`id_paciente`),
  CONSTRAINT `fk_paciente_prevision`
    FOREIGN KEY (`id_prevision`)
    REFERENCES `curame_db`.`prevision` (`id_prevision`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_paciente_rut`
    FOREIGN KEY (`rut`)
    REFERENCES `curame_db`.`usuario` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`especialidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`especialidad` (
  `id_especialidad` INT NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_especialidad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`medico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`medico` (
  `id_medico` INT NOT NULL AUTO_INCREMENT,
  `id_especialidad` INT NOT NULL,
  `id_sucursal` INT NOT NULL,
  `rut` INT NOT NULL,
  PRIMARY KEY (`id_medico`),
  CONSTRAINT `fk_medico_especialidad`
    FOREIGN KEY (`id_especialidad`)
    REFERENCES `curame_db`.`especialidad` (`id_especialidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medico_sucursal`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `curame_db`.`sucursal` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medico_usuario`
    FOREIGN KEY (`rut`)
    REFERENCES `curame_db`.`usuario` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`secretaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`secretaria` (
  `id_secretaria` INT NOT NULL AUTO_INCREMENT,
  `id_sucursal` INT NOT NULL,
  `rut` INT NOT NULL,
  PRIMARY KEY (`id_secretaria`),
  CONSTRAINT `fk_secretaria_sucursal`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `curame_db`.`sucursal` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_secretaria_usuario`
    FOREIGN KEY (`rut`)
    REFERENCES `curame_db`.`usuario` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`cajero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`cajero` (
  `id_cajero` INT NOT NULL AUTO_INCREMENT,
  `id_sucursal` INT NOT NULL,
  `rut` INT NOT NULL,
  PRIMARY KEY (`id_cajero`),
  CONSTRAINT `fk_cajero_sucursal`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `curame_db`.`sucursal` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cajero_usuario`
    FOREIGN KEY (`rut`)
    REFERENCES `curame_db`.`usuario` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`calendario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`calendario` (
  `id_atencion` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `estado_fecha` TINYINT NOT NULL,
  `visible` TINYINT NOT NULL,
  `id_medico` INT NOT NULL,
  `id_especialidad` INT NOT NULL,
  `id_sucursal` INT NOT NULL,
  PRIMARY KEY (`id_atencion`),
  CONSTRAINT `fk_calendario_medico1`
    FOREIGN KEY (`id_medico`)
    REFERENCES `curame_db`.`medico` (`id_medico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calendario_medico2`
    FOREIGN KEY (`id_especialidad`)
    REFERENCES `curame_db`.`medico` (`id_especialidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calendario_medico3`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `curame_db`.`medico` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`sumario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`sumario` (
  `id_sumario` INT NOT NULL AUTO_INCREMENT,
  `sumario` VARCHAR(250) NOT NULL,
  `id_atencion` INT NOT NULL,
  PRIMARY KEY (`id_sumario`),
  CONSTRAINT `fk_sumario_calendario`
    FOREIGN KEY (`id_atencion`)
    REFERENCES `curame_db`.`calendario` (`id_atencion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`boleta` (
  `id_boleta` INT NOT NULL AUTO_INCREMENT,
  `monto` INT NOT NULL,
  `id_paciente` INT NOT NULL,
  `id_medico` INT NOT NULL,
  `id_cajero` INT NOT NULL,
  `id_sucursal` INT NOT NULL,
  `id_medio_pago` INT NOT NULL,
  `id_atencion` INT NOT NULL,
  PRIMARY KEY (`id_boleta`),
  CONSTRAINT `fk_boleta_paciente`
    FOREIGN KEY (`id_paciente`)
    REFERENCES `curame_db`.`paciente` (`id_paciente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boleta_medico`
    FOREIGN KEY (`id_medico`)
    REFERENCES `curame_db`.`medico` (`id_medico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boleta_cajero`
    FOREIGN KEY (`id_cajero`)
    REFERENCES `curame_db`.`cajero` (`id_cajero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boleta_sucursal`
    FOREIGN KEY (`id_sucursal`)
    REFERENCES `curame_db`.`sucursal` (`id_sucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boleta_medio_pago`
    FOREIGN KEY (`id_medio_pago`)
    REFERENCES `curame_db`.`medio_pago` (`id_medio_pago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boleta_calendario`
    FOREIGN KEY (`id_atencion`)
    REFERENCES `curame_db`.`calendario` (`id_atencion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `curame_db`.`comision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `curame_db`.`comision` (
  `id_comision` INT NOT NULL,
  `fecha_emision` DATE NOT NULL,
  `monto` INT NOT NULL,
  `id_boleta` INT NOT NULL,
  PRIMARY KEY (`id_comision`),
  CONSTRAINT `fk_comision_boleta`
    FOREIGN KEY (`id_boleta`)
    REFERENCES `curame_db`.`boleta` (`id_boleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
