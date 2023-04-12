const { Router } = require("express");
const { User } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

router.get('/user', async(req, res) => {
    try {
        const { fechaInicio, fechaFin, enabled } = req.query

        const whereClause = {
            createdAt: {
                [Op.gte]: fechaInicio,
                [Op.lte]: fechaFin
            }
        }
        
        if (typeof enabled === 'undefined') {
            whereClause.enabled = true
        }

        if(!fechaInicio && !fechaFin){
            const usuarios = await User.findAndCountAll({
                where: whereClause
            })
            if(enabled === true){
                res.status(200).json({msg: `Actualmente hay ${usuarios.count} usuarios activos en la base de datos`})
            }else {
                res.status(200).json({msg: `Actualmente hay ${usuarios.count} usuario/s baneado/s en la base de datos`})      
            }
        }
        
        if(fechaInicio && fechaFin && !enabled){
            const usuariosActivos = await User.findAndCountAll({
                where: whereClause
            })

            const usuarioInactivos = await User.findAndCountAll({
                where: { enabled: false }
            })
            // console.log(enabled)
            res.status(200).json({msg: `Hay ${usuariosActivos.count} usuario/s activos entre las fechas ${fechaInicio} y ${fechaFin}, tambien hay ${usuarioInactivos.count} baneados en el mismo periodo`})
        }
        
        
          
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.get('/orders', async (req, res) => {

})

module.exports= router;