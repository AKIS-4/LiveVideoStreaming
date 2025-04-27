const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'Shivamisagoodboy'

router.post('/createuser', async(req, res)=>{
    // Check whether the username exists already
    try {
        let success = false
        console.log(req.body.name)
        let user = await User.findOne({ name: req.body.name })
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name, 
            password: secPass,
            tag: [],
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message, ' you are in catch error')
        res.status(500).send("Internal server error")
    }
})

router.post('/login',async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    try {
        let user = await User.findOne({ name })
        let success = false
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: { 
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message, error)
        res.status(500).send("Internal server error")
    }
})

router.get('/gettag', async (req, res) => {
    try {
        let userId = req.user
        const user = await User.findOne({ userId })
        res.send(user.tag)
    } catch (error) {
        console.error(error.message, error)
        res.status(500).send("Internal server error")
    }
})

router.post('/addtag', async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { name: req.body.name },
            { $push: { tag: req.body.tag } },
            { upsert : true }
        );
        res.send("done")
    } catch (error) {
        console.error(error.message, error)
        res.status(500).send("Internal server error")
    }
})
module.exports = router