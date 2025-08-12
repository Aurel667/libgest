require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }))

mongoose.connect(process.env.MONGODB_URI, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

const userRoutes = require('./user.route')

// Health check endpoint
app.get('/api/auth/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'auth-service', timestamp: new Date().toISOString() })
})

app.use('/api/auth', userRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})