

//Login existing user
const loginUser = async(req, res) => {
    res.send({
      token: 'test123'
    })
}

module.exports = { 
    loginUser
}