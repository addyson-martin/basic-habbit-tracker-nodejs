const userModel = require('../site-models/user')

const habitStatus = async(req, res) => {
    try {
        const name = req.params.name
        let ishobby = false,
            hobbyStatus
        let userdata = await userModel.findOne({ name: 'adi' })
        const hobbies = userdata.hobbies
        hobbies.forEach((hobby) => {
            if (hobby[name]) {
                ishobby = true
                hobbyStatus = hobby[name]
            }
        });

        if (ishobby) {
            res.render('trackhobby', {
                name,
                userData: JSON.stringify(hobbyStatus)
            })
        } else {
            res.status(400).json({ message: 'NO HOBBY FOUND PLEASE CREATE AN HOBBY/ or YOU TRIED TO ACCESS OUT OF WEBSITE', status: "we can make a 404 page over here" })
        }
    } catch {
        res.status(502).json({ error: "db connection failed try again" })
    }
}

module.exports = habitStatus