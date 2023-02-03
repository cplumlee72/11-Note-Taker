const router = require('express').Router();
const fs = require('fs');

const routes = require('./htmlRoutes');

router.use(routes);

module.exports = router; 