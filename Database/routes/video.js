const express = require('express')
const User = require('../models/video')
const Tag = require('../models/tag')
const Video = require('../models/user')
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

router.post('/deletevideo', async(req, res)=>{
    try {
        await User.deleteOne({ name: req.body.name })
	const user = await  Video.findOne({ name: `${req.body.name.split('_')[0]}`})
        const tag = user.tag;
	console.log(tag)
        for(let i =0; i<tag.length; i++){
            await Tag.findOneAndUpdate(
                { tag : tag[i] },  
                { $pull: { name: req.body.name } }  
            );
        }
        res.status(200).send('OK')
    } catch (error) {
        console.error(error.message, 'you are in catch error')
        res.status(500).send("Internal server error")
    }
})

router.post('/stream-auth', async (req, res) => {
    const { name } = req.body;
    const stream = await User.findOne({ name });
    if (stream) {
        return res.status(200).send('OK');
    } else {
        return res.status(403).send('Forbidden');
    }
});

module.exports = router
