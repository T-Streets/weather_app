const request = require('request');
const config = require('./env');

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=23130%20robert%20rd%20los%20angeles&key=${config.API_KEY}`,
    json: true
}, (err, res, body) => {
    console.log(body.results[0].formatted_address) //number specifies how many spaces for indentation //leave middle param as undefinded
    console.log(body.results[0].geometry.location.lat)
    console.log(body.results[0].geometry.location.lng)
})