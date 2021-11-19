const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const chalk = require('chalk')

const config = require('./config')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
        `mongodb+srv://${config.name}:${config.password}@cluster0.ikq2a.mongodb.net/todos`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    )
    app.listen(PORT, () => {
      console.log(chalk.green('Server has been started...'))
    })
  } catch (e) {
    console.log(chalk.red(e))
  }
}

start()
