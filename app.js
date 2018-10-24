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

const encodedAddress = encodeURI(argv.address)

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.API_KEY}`,
    json: true
}, (err, res, body) => {
    console.log(body.results[0].formatted_address) //number specifies how many spaces for indentation //leave middle param as undefinded
    console.log(body.results[0].geometry.location.lat)
    console.log(body.results[0].geometry.location.lng)
})