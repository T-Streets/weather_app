const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/b41aff2516429b9cfd84d1f42f686a6a/${lat},${lng}`,
        json: true
    }, (error, res, body) => {
        if(!error && res.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('unable to fetch weather')
        }
    })
}

module.exports.getWeather = getWeather
