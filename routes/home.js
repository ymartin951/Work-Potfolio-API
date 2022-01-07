const router = require('express').Router()

router.get("/", (req,res) => {
    res.send('Welcome to the blog API')
})

module.exports  =  router