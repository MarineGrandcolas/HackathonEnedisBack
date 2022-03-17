const router = require('express').Router();
const usersRouter = require('./users.routes');
const questsRouter = require('./quests.routes');
const stepsRouter = require('./steps.routes');


router.use('/users', usersRouter);
router.use('/quests', questsRouter);
router.use('/steps', stepsRouter);

module.exports = router;