const connectToMongo = require('./mongo')
const express = require('express')
const cors = require('cors')

connectToMongo()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })); 
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tag', require('./routes/tag'))
app.use('/api/video', require('./routes/video'))

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
})
