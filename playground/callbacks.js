const getUser = (id, callback) => {
    const user = {
        id: id,
        name: 'kombucha'
    }
    callback(user)
}

getUser(24, (user) => {
    console.log(user)
})