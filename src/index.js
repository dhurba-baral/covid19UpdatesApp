const express = require('express')
const hbs = require('hbs')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const covid = require('./utilis/covid')
const worldData = require('./utilis/worldData')
const getCountry = require('./utilis/locationUpdate')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT

//to load path of partials,views and static directory
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')

//to make hbs as default view engine
app.set('view engine', 'hbs');

//to load partials from specific directory
hbs.registerPartials(partialsPath);
//to load views folder 
app.set('views', viewsPath)
//to load public folder(static directory)
app.use(express.static(publicPath))

//api route handlers
app.get('', (req, res) => {
   res.render('corona', {
      headline: 'Covid-19 Updates',
      footerMsg: 'By Dhurba Baral'
   })
})
app.get('/home', (req, res) => {
   if (!req.query.country) {
      return res.send({
         error: "Please! provide the country name."
      })
   }
   covid(req.query.country, (error, { totalCases, totalDeaths, activeCases, totalRecovered, totalTests } = {}) => {
      if (error) {
         return res.send({
            error
         })
      }
      res.send({
         totalCases,
         totalDeaths,
         activeCases,
         totalRecovered,
         totalTests
      })
   })
})

app.get('/world', (req, res) => {
   worldData((error, { worldCases, worldDeaths, worldRecovered } = {}) => {
      if (error) {
         return res.send({
            error
         })
      }
      res.send({
         worldCases,
         worldDeaths,
         worldRecovered
      })
   })
})
io.on('connection', (socket) => {
   socket.on('sendLocation', (position) => {
      app.get('/location', (req, res) => {
         getCountry(position.latitude, position.longitude, (error, { yourLocation } = {}) => {
            if (error) {
               return res.send({
                  error
               })
            }
            covid(yourLocation, (error, { totalCases, totalDeaths, activeCases, totalRecovered, totalTests } = {}) => {
               if (error) {
                  return res.send({
                     error
                  })
               }
               res.send({
                  totalCases,
                  totalDeaths,
                  activeCases,
                  totalRecovered,
                  totalTests
               })
            })
         })
      })
   })
})

server.listen(port, () => {
   console.log('The server is started in port ' + port)
})