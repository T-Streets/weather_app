const request = require('request')

const geocodeAddress = (address, apiKey, callback) => {
    const encodedAddress = encodeURI(address)

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
    }, (error, res, body) => {
        if(error) {
            callback('unable to connect to google servers')
        } else if(body.statuscode === 400) {
            callback('Unable to find address')
        } else if(body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng 
            })
        }
    })
}

module.exports.geocodeAddress = geocodeAddress
