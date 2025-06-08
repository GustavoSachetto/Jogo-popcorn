const express = require('express');
const router = express.Router();

const controller = require('../../controllers/v1/usuarios');

router.get('/v1/usuarios', controller.get);
router.post('/v1/usuarios', controller.post);

module.exports = router;