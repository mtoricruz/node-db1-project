const express = require('express');

const knex = require("../data/dbConfig");

const router = express.Router();

// =================== POST =======================

router.post('/', (req, res) => {
    knex("accounts")
        .insert(req.body, "id")
        .then(([id]) => {
            res.status(200).json({ data: id })
        })
        .catch(err => {
            console.log("POST / error", err)
            res.status(500).json({ message: err.message });
        })
});

// =================== GET =======================

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .then(account => {
            res.status(200).json({ data: account })
        }).catch(err => {
            console.log('GET / error', err);
            res.status(500).json({ message: err.message })
        });
});

// =================== PUT =======================

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: "you did it!" })
            } else {
                res.status(404).json({ message: "no records found" })
            }
        })
        .catch(err => {
            console.log("POST / error", err)
            res.status(500).json({ message: err.message });
    })
});

// =================== DELETE =======================

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    knex('accounts')
        .where({ id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "you deleted it!" })
            } else {
                res.status(404).json({ message: "no records found" })
            }
        })
        .catch(err => {
            console.log("DELETE / error", err)
            res.status(500).json({ message: err.message });
    })
});


module.exports = router