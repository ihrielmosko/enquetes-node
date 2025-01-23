import Joi from 'joi';
import { readFile } from 'fs/promises';
import express from 'express';
import { getEnquetes, getEnquete, criarEnquete } from './database.js';
import { create } from 'express-handlebars';
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const hbs = create({ defaultLayout: 'principal', extname: 'handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {
    try {
        const enquetes = await getEnquetes();
        res.render('home', {enquetes});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }

});

app.get('/alterar', async (req, res) => {
    try {
        res.render('alterar');
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.get('/visualizar', async (req, res) => {
    try {
        res.render('visualizar');
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.get('/criar', async (req, res) => {
    try {
        res.render('criar');
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.post('/nova', async (req, res) => {
    try{
        const { titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6 } = req.body;
        const enquete = await criarEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6);
        //res.status(201).send(enquete)
        res.redirect('/');
    } catch (err) {
        res.status(404).send(`erro ao criar enquete: ${err}`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ouvindo porta ${port}`));