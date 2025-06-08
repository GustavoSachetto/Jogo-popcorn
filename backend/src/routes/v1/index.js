const express = require('express');
const router = express.Router();

const controller = require('../../controllers/v1/index');

router.get('/v1/', controller.get);

module.exports = router;