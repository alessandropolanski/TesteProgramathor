const express = require('express');
const router = express.Router();
const clientController = require('../controller/client');

// Retorna todos os clientes
router.get('/', clientController.getAllClients);

// Cria um novo cliente
router.post('/', clientController.createClient);

// Retorna dados cliente por ID
router.get('/:id', clientController.getClientById);

// Update em cliente por ID
router.put('/:id', clientController.updateClient);

// Deleta cliente por ID
router.delete('/:id', clientController.deleteClient);

// Calcula a rota a ser realizada
router.get('/teste/rota', clientController.getRoute);


module.exports = router;