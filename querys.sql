-- 1)
-- Crear la DB
CREATE DATABASE IF NOT EXISTS prueba1;

USE prueba1;

-- Crear las tablas
CREATE TABLE Medicos( id_medico INT AUTO_INCREMENT PRIMARY KEY, medico VARCHAR(100) NOT NULL);
CREATE TABLE Especialidades (id_especialidad INT AUTO_INCREMENT PRIMARY KEY, especialidad VARCHAR(100) NOT NULL);
CREATE TABLE Pacientes (id_paciente INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100), correo VARCHAR(150));
CREATE TABLE Motivos (id_motivo INT AUTO_INCREMENT PRIMARY KEY, motivo VARCHAR(150));
CREATE TABLE Estados_citas (id_estado INT AUTO_INCREMENT PRIMARY KEY, estado VARCHAR(100));
CREATE TABLE Pagos(id_metodo INT AUTO_INCREMENT PRIMARY KEY, metodo VARCHAR(100));
CREATE TABLE Ubicaciones (id_ubicacion INT AUTO_INCREMENT PRIMARY KEY, ubicacion VARCHAR(150));
CREATE TABLE Medicos_especialidad (
    id_medico INT NOT NULL,
    id_especialidad INT NOT NULL,
    PRIMARY KEY (id_medico, id_especialidad),
    FOREIGN KEY (id_medico) REFERENCES Medicos(id_medico) ON UPDATE CASCADE,
    FOREIGN KEY (id_especialidad) REFERENCES Especialidades(id_especialidad) ON UPDATE CASCADE);
CREATE TABLE Citas(
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    id_especialidad INT NOT NULL,
    fecha DATE,
    hora TIME,
    id_motivo INT,
    descripcion VARCHAR(500),
    id_ubicacion INT,
    id_metodo INT,
    id_estado INT,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente) ON UPDATE CASCADE,
    FOREIGN KEY (id_medico, id_especialidad) REFERENCES Medicos_especialidad(id_medico, id_especialidad) ON UPDATE CASCADE,
    FOREIGN KEY (id_motivo) REFERENCES Motivos(id_motivo) ON UPDATE CASCADE,
    FOREIGN KEY (id_ubicacion) REFERENCES Ubicaciones(id_ubicacion) ON UPDATE CASCADE,
    FOREIGN KEY (id_metodo) REFERENCES Pagos(id_metodo) ON UPDATE CASCADE,
    FOREIGN KEY (id_estado) REFERENCES Estados_citas(id_estado) ON UPDATE CASCADE
    );


--2)
-- Crear una BD a partir del csv
CREATE TABLE citas_raw (
    nombre_paciente VARCHAR(200),
    correo_paciente VARCHAR(200),
    medico VARCHAR(200),
    especialidad VARCHAR(200),
    fecha_cita VARCHAR(50),
    hora_cita VARCHAR(50),
    motivo VARCHAR(200),
    descripcion TEXT,
    ubicacion VARCHAR(200),
    metodo_pago VARCHAR(100),
    estatus_cita VARCHAR(100)
    );

-- Insertar en la tabla
LOAD DATA INFILE 'C:/Users/Feli-/Desktop/temporales/crudclinic.csv'
    INTO TABLE citas_raw
    CHARACTER set utf8mb4
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (nombre_paciente, correo_paciente, medico, especialidad, fecha_cita, hora_cita, motivo, descripcion, ubicacion, metodo_pago, estatus_cita);

-- ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
-- Este paso se hace desde dbeaver o js

-- 3)
-- Poblar las tablas básicas (sin fk)

INSERT INTO Pacientes (nombre, correo) SELECT DISTINCT LOWER(TRIM(nombre_paciente)), LOWER(TRIM(correo_paciente)) FROM citas_raw;
INSERT INTO Medicos(medico) SELECT DISTINCT TRIM(medico) FROM citas_raw;
INSERT INTO Especialidades (especialidad) SELECT DISTINCT TRIM(especialidad) FROM citas_raw;
INSERT INTO Motivos(motivo) SELECT DISTINCT TRIM(motivo) FROM citas_raw;
INSERT INTO Ubicaciones(ubicacion) SELECT DISTINCT TRIM(ubicacion) FROM citas_raw;
INSERT INTO Pagos(metodo) SELECT DISTINCT TRIM(metodo_pago) FROM citas_raw;
INSERT INTO Estados_citas(estado) SELECT DISTINCT TRIM(estatus_cita) FROM citas_raw;

-- Poblar tablas con fk
INSERT INTO Medicos_especialidad (id_medico, id_especialidad) 
    SELECT m.id_medico, e.id_especialidad FROM ( -- Selecciona id_medico de Medicos y id_especialidad de Especialidades
    SELECT DISTINCT TRIM(medico) AS medico, TRIM(especialidad) AS especialidad -- Combinaciones unicas entre medico y especialidad 
    FROM citas_raw
    ) tmp
    JOIN Medicos m ON m.medico = tmp.medico
    JOIN Especialidades E ON e.especialidad = tmp.especialidad;

-- Citas
INSERT INTO Citas (id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo, id_estado)
SELECT
    p.id_paciente,
    m.id_medico,
    e.id_especialidad,
    STR_TO_DATE(TRIM(cr.fecha_cita), '%Y-%m-%d'),
    STR_TO_DATE(TRIM(cr.hora_cita), '%H:%i'),
    mo.id_motivo,
    cr.descripcion,
    u.id_ubicacion,
    pay.id_metodo,
    es.id_estado
    FROM citas_raw cr
    LEFT JOIN Pacientes p ON p.nombre = cr.nombre_paciente AND p.correo = cr.correo_paciente
    LEFT JOIN Medicos m ON m.medico = cr.medico
    LEFT JOIN Especialidades e ON e.especialidad = cr.especialidad
    LEFT JOIN Motivos mo ON mo.motivo = cr.motivo
    LEFT JOIN Ubicaciones u ON u.ubicacion = cr.ubicacion
    LEFT JOIN Pagos pay ON pay.metodo = cr.metodo_pago
    LEFT JOIN Estados_citas es ON es.estado = cr.estatus_cita;
