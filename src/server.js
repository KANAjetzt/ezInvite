const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Error Handling
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

// Connect to the DB
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))

// Start the server
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

// Error Handling
process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('UNHANDELD REJECTION! Shutting down...')
  server.close(() => process.exit(1))
})

process.on('SIGTERM', () => {
  console.log('✋ SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
