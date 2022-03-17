const router = require('express').Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');
const questsRouter = require('./quests.routes');
const stepsRouter = require('./steps.routes');

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/quests', questsRouter);
router.use('/steps', stepsRouter);

module.exports = router;