const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chaitanya Hegde'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chaitanya Hegde'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a Help Page',
        name: 'Chaitanya Hegde'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address is needed'
        }) 
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
           if (error){
               return res.send({
                error
            })
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })

         })
    })
    // res.send({
    //     forecast: '50 degrees',
    //     location: "Philadelphia",
    //     address: req.query.address
        
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404 Page',
        message: 'Help article not found',
        name: 'Chaitanya Hegde'
    })
})

app.get('*',(req, res) => {
    res.render('404Page', {
        title: '404 Page',
        message: 'Page not found.',
        name: 'Chaitanya Hegde'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on Port' + port)
})