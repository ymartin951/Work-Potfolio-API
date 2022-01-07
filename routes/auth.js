const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


//REGISTER A USER

router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    

    try {
        newUser = User({
        username: req.body.username,
         email: req.body.email,
        password: hashedPass
       
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Unable to save this user due to internal server error"})
    }
  
}
)


//LOGIN A USER

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
        res.status(400).json("this username was not found")
    }
    
    const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
        res.status(400).json("Not validated")
    }
const {password,...others} =  user._doc
    res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router