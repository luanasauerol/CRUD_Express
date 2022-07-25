const express = require('express');
const routes = express.Router();

let users = require('../users');

routes.get('/', (req, res) => {
    res.json(users);
});

routes.post('/', (req, res) => {
    const content = req.body;
    users = [...users, content];
    return res.status(201).json(users);
});

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const userFound = users.find((user) => user.id === id);

    if (!userFound) {
        return res.status(400).json({ "message": "Usuário não encontrado" });
    }
    const updatedUser = users.map((user) => {
        if (user.id === id) {
            return content;
        }
        return user;
    })
    users = updatedUser;
    return res.status(200).json(users);

});

routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
        return res.status(400).json({ "message": "Usuário não encontrado" });
    }

    users = users.filter((user) => user.id !== id);
    return res.status(200).json(users);
});

routes.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { password } = req.body;
    const userFound = users.find((user) => user.id === id);

    if (!userFound) {
        return res.status(400).json({ "message": "Usuário não encontrado" });
    }

    users = users.map((user, index) => {
        if (user.id === id) {
            users[index].password = password;
        }
        return user;
    });
    return res.status(200).json(users);
});

module.exports = routes;