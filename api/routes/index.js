const express = require('express');
const router = express.Router();
const path = require('path')
const userModel = require('../../site-models/user')

router.post('/saveUserData', async(req, res) => {
    try {
        // console.log(req.body);

        const name = Object.keys(req.body)[0]
        let userdata = await userModel.findOne({ name: 'adi' })
        userdata.hobbies.forEach((hobby, idx) => {
            if (hobby[name]) {
                userdata.hobbies[idx] = req.body
            }
        });
        // console.log(userdata.hobbies);

        await userModel.findOneAndUpdate({ name: 'adi' }, userdata, { upsert: true })

        res.status(200).json({ success: true, message: 'saved' })
    } catch {
        res.status(502).json({ success: false, message: 'error' })
    }
})


router.get('/userInfo', async(req, res) => {
    let user = await userModel.findOne({ name: 'adi' }, { _id: 0 })
    res.send(user)
})

router.post('/addHobby', async(req, res) => {
    const hobbyN = req.body.hobbyName
    let isHobbyExist = false
    let userdata = await userModel.findOne({ name: 'adi' })
    userdata.hobbies.forEach((hobby, idx) => {
        if (hobby[hobbyN]) {
            isHobbyExist = true
        }
    });
    if (isHobbyExist) {
        res.status(403).json({ status: 'already Exist', isHobbyExist })
    } else {
        let obj = {}
        obj[hobbyN] = []
        userdata.hobbies.push(obj)
        await userModel.findOneAndUpdate({ name: 'adi' }, userdata, { upsert: true })
        res.status(200).json({ status: 'Added', isHobbyExist })

    }
})
module.exports = router