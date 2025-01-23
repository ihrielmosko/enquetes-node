import Joi from 'joi';
import { readFile } from 'fs/promises';  // Usando fs/promises
import express from 'express';
import { getEnquetes, getEnquete, criarEnquete } from './database.js';
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try {
        const html = await readFile('./index.html', 'utf8');
        res.send(html);
    }
    catch (err) {
        res.status(404).send('página não localizada');
    }

});

app.get('/alterar', async (req, res) => {
    try {
        const html = await readFile('./alterar.html', 'utf8');
        res.send(html);
    }
    catch (err) {
        res.status(404).send('página não localizada');
    }
});

app.get('/visualizar', async (req, res) => {
    try {
        const html = await readFile('./visualizar.html', 'utf8');
        res.send(html);
    }
    catch (err) {
        res.status(404).send('página não localizada');
    }
});

// app.post('/notes', async (req, res) => {
//     const { title, contents } = req.body;
//     const note = await criarEnquete(title, contents);
//     res.status(201).send(note)
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ouvindo porta ${port}`));