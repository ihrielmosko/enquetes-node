CREATE DATABASE enquetes_db;
USE enquetes_db;

CREATE TABLE enquetes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL,
    opcao1 VARCHAR(100) NOT NULL,
    opcao2 VARCHAR(100) NOT NULL,
    opcao3 VARCHAR(100) NOT NULL,
    opcao4 VARCHAR(100),
    opcao5 VARCHAR(100),
    opcao6 VARCHAR(100),
    votos_opcao1 INT DEFAULT 0,
    votos_opcao2 INT DEFAULT 0,
    votos_opcao3 INT DEFAULT 0,
    votos_opcao4 INT DEFAULT 0,
    votos_opcao5 INT DEFAULT 0,
    votos_opcao6 INT DEFAULT 0
);

INSERT INTO enquetes (titulo, data_inicio, data_termino, opcao1, opcao2, opcao3)
VALUES ('teste1', '2025-01-11', '2025-02-10', 'op1', 'op2', 'op3');