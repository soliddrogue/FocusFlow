const router = require("express").Router()


router.get("/tracker", (req, res)=>{
    res.send("welcome")
})



module.exports = router;