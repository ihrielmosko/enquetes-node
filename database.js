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

const enquete = await getEnquete(1);
//console.log(enquete);

export async function criarEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4 = null, op5 = null, op6 = null) {
    const [resultado] = await pool.query(`
        INSERT INTO enquetes (titulo, data_inicio, data_termino, opcao1, opcao2, opcao3, opcao4, opcao5, opcao6)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6])
    const id = resultado.insertId;
    return getEnquete(id);
}

// const dataIni = new Date(2025, 0, 22);
// const dataFim = new Date(2025, 1, 22);
// const resultado = await criarEnquete('teste2', dataIni, dataFim, 'op1', 'op2', 'op3');
// console.log(resultado)
