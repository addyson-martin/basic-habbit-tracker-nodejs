const userModel = require('../site-models/user')

const loadDashboard = async(req, res) => {
    let userdata = await userModel.findOne({ name: 'adi' })
    let hobbies = []
    userdata.hobbies.forEach(hobby => {
        hobbies.push((Object.keys(hobby)[0]))
    });
    // res.send(hobbies)
    res.render('dashboard', {
        hobbies,
        name: 'Adi'
    })
}

module.exports = loadDashboard