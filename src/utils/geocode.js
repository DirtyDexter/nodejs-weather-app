const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmsxMW1hcGJveCIsImEiOiJjanR5a2lxYnAwcWZ2NGVtcW4weDdsdzRoIn0.QQkKlRPOUs3Au4DM-k0PVg&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect geocode api')
        } else if (body.features.length === 0) {
            callback('No place found!!')
        } else {
            const {features} = body
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode