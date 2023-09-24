var express = require('express');
var router = express.Router();
var Todo = require('./todos.query.js');
var auth = require('../../middleware/auth.js');

router.get('/', auth.authenticateToken, async (req, res) => {
    try {
        const todo = await Todo.getAllTodo();
        console.log("Get all todos.\n", todo[0]);
        res.status(200).send(todo);
    } catch (err) {
        console.error("Erreur lors de la récupération des tâches:", err);
        res.status(500).send({ msg: "Erreur interne du serveur" });
    }
});

router.post('/', auth.authenticateToken, async (req, res) => {
    try {
        const new_todo = new Todo(req.body);

        if (!new_todo) {
            return res.status(400).send({ message: 'Invalid Inputs' });
        }

        const todo = await Todo.createTodo(new_todo);
        console.log('Todo Created.\n', new_todo);
        res.status(200).send(todo[0]);
    } catch (err) {
        console.error("Erreur lors de la création de la tâche:", err);
        res.status(500).send({ msg: "Erreur interne du serveur" });
    }
});


router.get('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const todo = await Todo.getTodoById(req.params.id);

        if (!todo[0]) {
            return res.status(404).send({ msg: "Not found" });
        }

        console.log('Recovered todo.\n');
        res.status(200).send(todo[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération de la tâche:", err);
        res.status(500).send({ msg: "Erreur interne du serveur" });
    }
});


router.delete('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.remove(id);
        console.log('Successfully deleted record number:', id, '\n');
        res.status(200).send({
            msg: 'Successfully deleted record number: ' + id
        });
    } catch (err) {
        console.error("Erreur lors de la suppression de l'enregistrement:", err);
        res.status(500).send({ msg: "Erreur interne du serveur" });
    }
});


module.exports = router;