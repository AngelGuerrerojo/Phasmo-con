const express = require('express');
const router = express.Router();
const controlador = require('../controller/auth');

router.post('/login', controlador.login);

module.exports = router;
