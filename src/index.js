import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import sassMiddleware from 'node-sass-middleware'
import hbs from 'express-handlebars'

const app = express()

app.use(
  bodyParser.json()
)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '../src/sass'),
  dest: path.join(__dirname, '../public'),
  debug: true,
  prefix: '/css',
  outputStyle: 'compressed'
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../src/views'))

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, '../src/views/layouts/'),
  partialsDir: path.join(__dirname, '../src/views/partials/')
}))

app.use(
  express.static(
    path.join(
      __dirname, '../public'
    )
  )
)

app.route('/')
  .get((req, res, next) => {
    res.render('pages/index')
  })
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
