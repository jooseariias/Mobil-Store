// const { Router } = require('express');

// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

// const productsRoute = require('./productsRoute')
// // const usersRouter = require('./')

// const brandRoute = require("./brandRoute.js")
// const dbChargeRoute = require('./dbChargeRoute.js')

// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
// router.use('/product', productsRoute);
// router.use('/brand', brandRoute);
// // router.use('/user', usersRouter);
// router.use(dbChargeRoute)



// module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  productsRoute = require('./productsRoute')
const brandRoute=require('./brandRoute');

const userRoute= require('./userRoute');
const dbRoute = require('./dbChargeRoute');
const loginRoute= require('./loginRoute')


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

router.use('/login', loginRoute);



module.exports=router;