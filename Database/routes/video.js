const express = require('express')
const User = require('../models/video')
const Tag = require('../models/tag')
const router = express.Router()

router.post('/createvideo', async(req, res)=>{
    try {
        let user = await User.findOne({ name: req.body.name })
        if (user) {
            return res.status(400).json("no")
        }

        user = await User.create({
            name: req.body.name
        })

        res.json("done")
    } catch (error) {
        console.error(error.message, 'you are in catch error')
        res.status(500).send("Internal server error")
    }
})

router.get('/deletevideo', async(req, res)=>{
    try {
        await User.deleteOne({ name: req.body.name })
        const tag = req.body.tag;
        for(let i =0; i<tag.length; i++){
            await Tag.findOneAndUpdate(
                { tag : tag[i] },  
                { $pull: { name: req.body.name } }  
            );
        }
        res.json(tag)
    } catch (error) {
        console.error(error.message, 'you are in catch error')
        res.status(500).send("Internal server error")
    }
})

module.exports = router