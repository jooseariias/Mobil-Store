const { Router } = require("express");
const { Op, where } = require("sequelize");
const mercadopago = require("mercadopago"); 
// const {sendEmail, sendEmailOrderSent} = require("../utils/notifications");
const axios = require("axios");
const path = require('path');
const bodyParser = require("body-parser");
require("dotenv").config();
const { ACCESS_TOKEN_MP } = process.env;

const router = Router();
router.use(bodyParser.urlencoded({ extended: false }));
//agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

const {
    User,
    Orders,
    Product,
    OrderStatus,
    Detail
    
  } = require("../db.js");


router.post('/', async (req, res) => {
    try {
        const arrayOfOrders = req.body;

        let successUrl;

        let preference = {
            items: [],
            back_urls: {
              success: successUrl,
              failure: `${process.env.BACK_URL}/orders/pago-fallido`,
              pending: `${process.env.BACK_URL}/orders/pago-pendiente`,
            },
            auto_return: "approved",
            binary_mode: true,
        };
        // {
        //     "idUser": 3,
        //     "address": "Direccion de envio, 1",  
        //     "total": 200,
        //     "productAndQuantity": [
        //       {"idProduct": 6,"quantity": 2},
        //       {"idProduct": 19,"quantity": 4},
        //       {"idProduct": 7,"quantity": 1},
        //     ]
        //   }
          
        let { cantidades, precios, titulos, foto } = preference.map( (product) => {
            return (
                cantidades =  product.quantity,
                precios =  product.unit_price,
                titulos = product.title,
                foto = product.picture_url
            );
        }).join(',');
        let idProducts = arrayOfOrders.productAndQuantity.map(order => order.idProduct).join(',') // 1,2,3

        // let cantidades2 = preference.items.map(product => product.quantity).join(',') // 2,4,1
        // let precios = preference.items.map(product => product.unit_price).join(',') // 300, 63, 350
        // let titulos = preference.items.map(product => product.title).join(',') // Galaxy S23 Ultra, P20 , Galaxy Z Flip4
        // let foto = preference.items.map(product => product.picture_url).join(',') // https://m.media-amazon.com/images/I/71nZ4-uixuL.AC_SY355.jpg, https://m.media-amazon.com/images/I/61V8FqrPIpL.AC_SY550.jpg, https://m.media-amazon.com/images/I/51K7abmErwL.AC_SX425.jpg


        successUrl = `${process.env.BACK_URL}/orders/pago-confirmado?idUser=${arrayOfOrders.idUser}&quantity=${cantidades}
        &price=${precios}&total=${arrayOfOrders.total}&idProduct=${idProducts}&address=${arrayOfOrders.address}
        &title=${titulos}&picture_url=${foto}`;
    }catch(error){
        res.status(400).json({error: error.message})
    }
});


router.get('/pago-fallido', async (req, res) => {
    res.status(200).json({msg: 'pago fallido'})
})

router.get('/pago-pendiente', async (req, res) => {
    res.status(200).json({msg: 'pago pendiente'})
})
  

router.get("/pago-confirmado", async (req, res) => {
    try {

        // const {
        //     idUser,
        //     quantity, // este
        //     price, // este 
        //     total,
        //     idProduct: idProduct, // este 
        //     address,
        //     title, // este
        //     picture_url, // este 
        //     description, // este
      
        //     collection_id,
        //     collection_status,
        //     payment_id,
        //     status,
        //     external_reference,
        //     payment_type,
        //     merchant_order_id,
        //     preference_id,
        //     processing_mode,
        //     merchant_account_id,
        //     site_id,
        //   } = req.query;

        console.log("req query es: ", req.query)
        res.status(200).json({msg: 'pago confirmado'})
    }catch(error){
        res.status(400).json({error: error.message})
    }
});


router.get('/', async (req, res) => {
    res.status(200).json({msg: "todo ok"})
})


module.exports = router;