const express = require('express');
const router = express.Router();
const path = require('path')
const userModel = require('../../site-models/user')

router.get('/saveUserData', async(req, res) => {

    const user = {
        name: 'adi',
        age: '20',
        gender: 'M',
        hobbies: [{ guitar: [{ identifier: '6#7#2020', option: 'Done' }, { identifier: '19#8#2020', option: 'Done' }] }, { dancing: [{ identifier: '6#8#2020', option: 'Not Done' }, { identifier: '19#8#2020', option: 'Not Done' }] }]
    }
    const objUser = new userModel(user)
    try {
        await userModel.deleteOne({ name: 'adi' })
        await objUser.save()
        res.send('success')
    } catch {
        res.send('failed')
    }
})


router.get('/userInfo', async(req, res) => {
    let user = await userModel.findOne({ name: 'adi' }, { _id: 0 })
    res.send(user)
})

module.exports = router