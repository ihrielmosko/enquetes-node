import Joi from 'joi';
import express from 'express';
import { getEnquetes, getEnquete, criarEnquete, altEnquete, delEnquete, votar } from './database.js';
import { create } from 'express-handlebars';
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const hbs = create({ defaultLayout: 'principal', extname: 'handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

hbs.handlebars.registerHelper('add', function(a, b) {
    return a + b;
});

app.get('/', async (req, res) => {
    try {
        const enquetes = await getEnquetes();
        enquetes: enquetes.reverse();
        console.log(enquetes);
        res.render('home', {enquetes, css: ['/home.css']});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }

});

app.get('/visualizar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enquete = await getEnquete(id);

        const opcoes = [
            { nome: enquete.opcao1, votos: enquete.votos_opcao1, id: enquete.id },
            { nome: enquete.opcao2, votos: enquete.votos_opcao2, id: enquete.id },
            { nome: enquete.opcao3, votos: enquete.votos_opcao3, id: enquete.id },
            { nome: enquete.opcao4, votos: enquete.votos_opcao4, id: enquete.id },
            { nome: enquete.opcao5, votos: enquete.votos_opcao5, id: enquete.id },
            { nome: enquete.opcao6, votos: enquete.votos_opcao6, id: enquete.id }
        ];

        enquete.opcoes = opcoes

        console.log(enquete);
        res.render('visualizar', {enquete, css: ['/view.css', '/visualizar.css']});
    }
    catch (err) {
        res.status(404).send(`página não localizada: ${err}`);
    }
});

app.get('/criar', async (req, res) => {
    try {
        res.render('criar', {css: ['/view.css', '/criar.css']});
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
        res.render('alterar', {enquete, css: ['/view.css', '/visualizar.css']});
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

app.post('/alterar_enquete/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const { titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6 } = req.body;
        await altEnquete(id, titulo, dataIni, dataFim, op1, op2, op3, op4, op5, op6);
        res.status(201).redirect(`/visualizar/${id}`);
    } catch (err) {
        res.status(404).send(`erro ao alterar enquete: ${err}`);
    }
});

app.post('/excluir_enquete/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await delEnquete(id);
        res.status(201).redirect('/');
    } catch (err) {
        res.status(404).send(`erro ao excluir enquete: ${err}`);
    }
});

app.post('/votar/:id/:opcao', async (req, res) => {
    const {id, opcao} = req.params;
    console.log(id, opcao);
    try {
        await votar(id, opcao);
        res.status(201).redirect(`/visualizar/${id}`)
    } catch (err) {
        res.status(404).send(`erro ao votar: ${err}`);
    }
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ouvindo porta ${port}`));