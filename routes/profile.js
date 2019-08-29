const router    =   require('express').Router()
const verify    =   require('../verify')
const user      =   require('../models/user')

router.get('/',verify, (req, res) => {
    user.findOne({_id: req.user}, (err, currentUser) => {
        res.send(`Welcome ${currentUser.name}`)
    })
})



module.exports  =   router;
