const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/12c0991c412ee4ff5ad21037f8875327/' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather api')
        } else if (body.error) {
            callback('Location not found')
        } else {
            const {currently, daily} = body
            const {precipProbability: rain, temperature} = currently
            const {data}= daily
            callback(undefined, 'Lowest temp is ' + data[0].temperatureLow + 'F and heighest temp is ' + data[0].temperatureHigh + 
                'F. Current temp is ' + temperature + 'F. The chance of rain is ' + rain + '%.') 
        }
    })
}

module.exports = forecast