const connection = require("../db-config");
const router = require("express").Router();


router.get('/', (req, res) => {
    connection.query('SELECT * FROM steps', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving steps from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM steps WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving step from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Step not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { step_title, step_description, image, isFinish, quest_id } = req.body;
  connection.query(
    'INSERT INTO quests (step_title, step_description, image, isFinish, quest_id) VALUES (?, ?, ?, ?, ?)',
    [step_title, step_description, image, isFinish, quest_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the step');
      } else {
        const id = result.insertId;
        const createdStep = { id, step_title, step_description, image, isFinish, quest_id };
        res.status(201).json(createdStep);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const stepId = req.params.id;
  const db = connection.promise();
  let existingStep = null;
  db.query('SELECT * FROM steps WHERE id = ?', [stepId])
    .then(([results]) => {
      existingStep = results[0];
      if (!existingStep) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE steps SET ? WHERE id = ?', [req.body, userId]);
    })
    .then(() => {
      res.status(200).json({ ...existingStep, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Step with id ${stepId} not found.`);
      else res.status(500).send('Error updating a step');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM steps WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a step');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Step deleted!');
        else res.status(404).send('Step not found.');
      }
    }
  );
});

module.exports = router;