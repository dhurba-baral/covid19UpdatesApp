const express = require('express')
const hbs = require('hbs')
const path = require('path')
const covid = require('../src/utilis/covid')


const app = express()
const port = process.env.PORT || 3000

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

app.listen(port, () => {
   console.log('The server is started in port ' + port)
})