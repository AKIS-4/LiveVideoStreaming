const express = require('express')
const User = require('../models/tag')
const router = express.Router()

router.post('/addintag', async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { tag: req.body.name },
            { $push: { name: req.body.tag } },
            { upsert: true }
        );
        return res.json("done");
    } catch (error) {
        console.error(error.message, ' you are in catch error')
        res.status(500).send("Internal server error")
    }
})

router.post('/getvideo', async (req, res) => {
    try {
        let userId = req.body.name;
        const mySet = new Set();
        let user;
        for (let i = 0; i < userId.length; i++) {
            user = await User.findOne({ tag: userId[i] })
            if (user) {
                user = user.name
                for (let j = 0; j < user.length; j++) {
                    mySet.add(user[j])
                }
            }
        }
        res.json(Array.from(mySet))
    } catch (error) {
        console.error(error.message, error)
        res.status(500).send("Internal server error")
    }
})

router.post('/rmtag', async (req, res) => {
    try {
        let userId = req.body.name;
        
        res.json("done")
    } catch (error) {
        console.error(error.message, error)
        res.status(500).send("Internal server error")
    }
})
module.exports = router