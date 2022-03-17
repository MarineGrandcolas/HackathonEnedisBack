const connection = require("../db-config");
const router = require("express").Router();
const Joi = require('joi');
const argon2 = require('argon2');
const {
    generateJwt
} = require('../utils/auth');
const checkJwt = require('../middlewares/checkJwt')

const {
    findUserByEmail,
    insertUser
} = require('../models/users');

router.get('/', checkJwt, (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving users from database');
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving user from database');
            } else {
                if (results.length) res.json(results[0]);
                else res.status(404).send('User not found');
            }
        }
    );
});

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

router.post('/', async (req, res) => {
    // recup donnees requete
    const {
        value,
        error
    } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    // verifie si user existe
    // await permet d'etre sur d'avoir un retour de verif user
    const [
        [existingUser]
    ] = await findUserByEmail(value.email);
    if (existingUser) {
        return res.status(409).json({
            message: "l'utilisateur existe deja",
        })
    }

    // etape de l'encryptage
    const hashedPassword = await argon2.hash(value.password);
    await insertUser(value.email, hashedPassword, 'ROLE_USER');

    const jwtKey = generateJwt(value.email, 'ROLE_USER');
    return res.json({
        credentials: jwtKey,
    })

    // return res.json({
    //     message: "l'utilisateur a bien ete cree"
    // })

})

router.post('/login', async (req, res) => {
    // on reprend ici les verif de donnees utilisateur dans le formulaire
    const {
        value,
        error
    } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json(error);
    }

    const [
        [existingUser]
    ] = await findUserByEmail(value.email);

    if (!existingUser) {
        return res.status(403).json({
            message: 'utilisateur no trouve ou le mot de passe ne correspond au compte'
        })
    }

    const verified = await argon2.verify(existingUser.password, value.password)

    if (!verified) {
        return res.status(403).json({
            message: 'utilisateur non trouve ou le mot de passe ne correspond au compte'
        })
    }

    const jwtKey = generateJwt(value.email, 'ROLE_USER');
    return res.json({
        credentials: jwtKey
    })
})


module.exports = router;