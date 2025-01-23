import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export async function getEnquetes() {
    const [linhas] = await pool.query("SELECT * FROM enquetes");
    return linhas;
}

export async function getEnquete(id) {
    const [linhas] = await pool.query(`
        SELECT *
        FROM enquetes
        WHERE id = ?
        `, [id]);
    return linhas[0];
}

export async function criarEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4 = null, op5 = null, op6 = null) {
    await pool.query(`
        INSERT INTO enquetes (titulo, data_inicio, data_termino, opcao1, opcao2, opcao3, opcao4, opcao5, opcao6)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6]);
    return
}

export async function altEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4 = null, op5 = null, op6 = null) {
    await pool.query(`
            UPDATE enquetes SET
            titulo = ?, data_inicio = ?, data_termino = ?, opcao1 = ?, opcao2 = ?, opcao3 = ?, opcao4 = ?, opcao5 = ?, opcao6 = ?
        `, [titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6]);
}