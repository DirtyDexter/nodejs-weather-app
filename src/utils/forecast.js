const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/12c0991c412ee4ff5ad21037f8875327/' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather api')
        } else if (body.error) {
            callback('Location not found')
        } else {
            const {currently} = body
            const {precipProbability: rain, temperature} = currently
            callback(undefined, {
                temperature,
                rain
            }) 
        }
    })
}

module.exports = forecast