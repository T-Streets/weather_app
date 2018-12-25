const yargs = require('yargs')
const axios = require('axios')
const config = require('./env')

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

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.API_KEY}`

axios.get(geocodeUrl).then((res) => {
    if(res.data.status === 'ZERO_RESULTS') {
        throw new Error('unable to find that address')
    }

    const lat = res.data.results[0].geometry.location.lat
    const lng = res.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/b41aff2516429b9cfd84d1f42f686a6a/${lat},${lng}`

    console.log(res.data.results[0].formatted_address)

    return axios.get(weatherUrl)
}).then(res => {
    const temp = res.data.currently.temperature
    const apparentTemp = res.data.currently.apparentTemperature
    console.log(`Its currently ${temp}, but it feels like ${apparentTemp}`)
}).catch(error => {
    if(error.code === 'ENOTFOUND') {
        console.log('unable to connect to api servers')
    } else {
        console.log(error.message)
    }
})