const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// path config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setting config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// stati resources
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'RK'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'RK'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'RK'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(address, (error, {latitude, longitude, location}={})=> {
        if (error) {
            return res.send({
                error,
                address
            })
        } 
            
        forecast(latitude, longitude, (error, {temperature, rain}={}) => {
            if (error) {
                return res.send({
                    error,
                    address
                })
            }
            res.send({
                address,
                location,
                forecast: 'Temperature is : ' + temperature + 'F and chance of rain is : ' + rain + '%'
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 page',
        name: 'RK',
        message: 'Help article not found !!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'RK',
        message: 'My 404 page !!!'
    })
})

app.listen(3000, () => {
    console.log('Server started on 3000 port')
})