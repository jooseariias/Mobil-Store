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
const ColoreRoute= require('./routeColor')
const CapacityRoute= require('./routeCapacity')
const orderRouter = require('./routeOrders');
const reviewsRoute= require("./routeReviews.js")
const wishlistRoute = require('./routeWishlist')
const router = Router();
const routerAuth = require("./auth")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', productsRoute);
router.use('/brand', brandRoute);
router.use('/user', userRoute);
router.use('/dbCharge', dbRoute);
router.use('/dbCharge', dbRoute);
router.use('/color', ColoreRoute);
router.use('/capacity' ,CapacityRoute)
router.use('/reviews', reviewsRoute);
router.use('/wishlist', wishlistRoute);

router.use("/", routerAuth)
router.use('/', loginRoute)
router.use('/orders', orderRouter)

module.exports = router;