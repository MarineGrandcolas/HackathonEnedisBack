const connection = require("../db-config");
const router = require("express").Router();


router.get('/', (req, res) => {
    connection.query('SELECT * FROM quests', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving quests from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM quests WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving quest from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Quest not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { quest_title, quest_description, point_exp, experience } = req.body;
  connection.query(
    'INSERT INTO quests (quest_title, quest_description, point_exp, experience) VALUES (?, ?, ?, ?)',
    [quest_title, quest_description, point_exp, experience],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the quest');
      } else {
        const id = result.insertId;
        const createdQuest = { id, quest_title, quest_description, point_exp, experience };
        res.status(201).json(createdQuest);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const questId = req.params.id;
  const db = connection.promise();
  let existingQuest = null;
  db.query('SELECT * FROM quests WHERE id = ?', [userId])
    .then(([results]) => {
      existingQuest = results[0];
      if (!existingQuest) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE quests SET ? WHERE id = ?', [req.body, userId]);
    })
    .then(() => {
      res.status(200).json({ ...existingQuest, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Quest with id ${questId} not found.`);
      else res.status(500).send('Error updating a quest');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM quests WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an quest');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Quest deleted!');
        else res.status(404).send('Quest not found.');
      }
    }
  );
});

module.exports = router;