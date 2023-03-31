const { Router } = require("express");
const {  Feature} = require("../db.js");
const router = Router();

router.get('/', async(req, res)=>{
    try {
        const feature= await Feature.findAll();

        if(feature){
            res.send(feature).status(200)
        }else{
            res.status(400).json({msg:"not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;