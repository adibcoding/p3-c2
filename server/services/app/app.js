require('dotenv').config()

const express = require('express')
const cors = require('cors')

const errorHandling = require('./middlewares/errorHandling')
const router = require('./routes')

const app = express() 
const PORT = process.env.PORT || 3001

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(router)

app.use(errorHandling)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
}) 

