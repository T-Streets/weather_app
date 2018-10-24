const axios = require('axios');

axios.get('http://react-code-test.graftonstudio.com/thumbnails/api')
    .then(response => {
        console.log(response.data)
    })