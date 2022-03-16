const router = require('express').Router();
const untitledRouter = require('./untitled.routes')

router.use('/untitled', untitledRouter);

module.exports = router;