const express = require('express');
const router = express.Router();

const controller = require('../../controllers/v1/ranqueamento');

router.get('/v1/ranqueamento', controller.get);
router.get('/v1/ranqueamento/tres-melhores', controller.getThree);

module.exports = router;