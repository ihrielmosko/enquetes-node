import Joi from 'joi';
import express from 'express';
import { getEnquetes, getEnquete, criarEnquete, altEnquete } from './database.js';
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
        res.render('home', {enquetes, css: 'home.css'});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }

});

app.get('/visualizar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enquete = await getEnquete(id)
        res.render('visualizar', {enquete, css: 'visualizar.css'});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.get('/criar', async (req, res) => {
    try {
        res.render('criar', {css: 'criar.css'});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.get('/alterar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enquete = await getEnquete(id)
        enquete.data_inicio = new Date(enquete.data_inicio).toISOString().split('T')[0];
        enquete.data_termino = new Date(enquete.data_termino).toISOString().split('T')[0];
        res.render('alterar', {enquete, css: 'alterar.css'});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.post('/criar_enquete', async (req, res) => {
    try{
        const { titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6 } = req.body;
        await criarEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6);
        res.status(201).redirect('/');
    } catch (err) {
        res.status(404).send(`erro ao criar enquete: ${err}`);
    }
});

app.post('/alterar_enquete', async (req, res) => {
    try{
        const { titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6 } = req.body;
        await altEnquete(titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6);
        res.status(201).redirect('/');
    } catch (err) {
        res.status(404).send(`erro ao alterar enquete: ${err}`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ouvindo porta ${port}`));