const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tag: { 
        type: String, 
        required: true 
    },
    name: { 
        type: Array, 
        default: [] 
    }
}, { 
    timestamps: true 
})

module.exports = mongoose.model('tags', UserSchema)
