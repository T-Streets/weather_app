const request = require('request');
const config = require('./env');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//encodes sting to be formatted for a URL
const encodedAddress = encodeURI(argv.address)

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.API_KEY}`,
    json: true
}, (error, res, body) => {
    if(error) {
        console.log(body)
        console.log('unable to connect to google servers')
    } else if(body.results[0].location.geocodeQualityCode.indexOf('X') !== -1) {
        console.log('Unable to find address')
    } else if(body.status === 'OK') {
    console.log(body.results[0].formatted_address) //number specifies how many spaces for indentation //leave middle param as undefinded
    console.log(body.results[0].geometry.location.lat)
    console.log(body.results[0].geometry.location.lng)
    }
})