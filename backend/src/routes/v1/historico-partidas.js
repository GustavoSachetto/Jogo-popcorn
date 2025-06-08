const express = require('express');
const router = express.Router();

const controller = require('../../controllers/v1/historico-partidas');

router.get('/v1/historico-partidas', controller.get);
router.post('/v1/historico-partidas', controller.post);

module.exports = router;