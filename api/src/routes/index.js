const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  productsRoute = require('./productsRoute')
const brandRoute=require('./brandRoute');
const userRoute= require('./userRoute')
const dbRoute = require('./dbChargeRoute')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    res.send("hola mundo")
})

router.use('/product', productsRoute);
router.use('/brand', brandRoute);
router.use('/user', userRoute);
router.use('/dbCharge', dbRoute);


module.exports = router;
