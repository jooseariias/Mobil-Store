const { Router } = require("express");
const { Op, where } = require("sequelize");
const mercadopago = require("mercadopago");
// const {sendEmail, sendEmailOrderSent} = require("../utils/notifications");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const { ACCESS_TOKEN_MP } = process.env;
const { crearOrden } = require("../utils/ordersSave");
const {
  sendConfirmedPaymentEmail,
  sendEmailOrderSent,
} = require("../utils/notifications");

const router = Router();
router.use(bodyParser.urlencoded({ extended: false }));
//agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

const { User, Orders, Product, OrderStatus, Detail } = require("../db.js");

router.post("/", async (req, res) => {
  try {
    const arrayOfOrders = req.body;
    // console.log(arrayOfOrders)

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
    let stock = true;

    await Promise.all(
      arrayOfOrders.productAndQuantity.map(async (product, index) => {
        const producto = await Product.findOne({
          where: {
            id: product.idProduct,
          },
        });

     
        preference.items[index] = {
          title: producto.name,
          picture_url: producto.image,
          currency_id: "ARS",
          description: producto.description.slice(0, 254),
          quantity: product.quantity,
          unit_price: parseFloat(producto.price),
        };
 
        let [cantidades, precios, titulos, foto] = preference.items
          .map((product) => [
            product.quantity,
            product.unit_price,
            product.title,
            product.picture_url,
          ])
          .reduce(
            (prev, curr) => [
              [...prev[0], curr[0]],
              [...prev[1], curr[1]],
              [...prev[2], curr[2]],
              [...prev[3], curr[3]],
            ],
            [[], [], [], []]
          )
          .map((arr) => arr.join(","));

        // let cantidades = preference.items.map((product) => product.quantity ).join(',')
        // let precios = preference.items.map(product => product.unit_price).join(',') // 300, 63, 350
        // let titulos = preference.items.map(product => product.title).join(',') // Galaxy S23 Ultra, P20 , Galaxy Z Flip4
        // let foto = preference.items.map(product => product.picture_url).join(',') // https://m.media-amazon.com/images/I/71nZ4-uixuL.AC_SY355.jpg, https://m.media-amazon.com/images/I/61V8FqrPIpL.AC_SY550.jpg, https://m.media-amazon.com/images/I/51K7abmErwL.AC_SX425.jpg
        let idProducts = arrayOfOrders.productAndQuantity
          .map((order) => order.idProduct)
          .join(",");

        successUrl = `${process.env.BACK_URL}/orders/pago-confirmado?idUser=${arrayOfOrders.idUser}&quantity=${cantidades}
                &price=${precios}&total=${arrayOfOrders.total}&idProduct=${idProducts}&address=${arrayOfOrders.address}
                &title=${titulos}&picture_url=${foto}`;
                let cadenaCantidades = cantidades.split(","); // ['1','2','1']

                let cadenaProductos = idProducts.split(",");
               
            
        for (let i = 0; i < cadenaProductos.length; i++) {
            const product = await Product.findOne({
            where: {
                id: parseInt(cadenaProductos[i]),
            },
            });
            // console.log("Stock es: ", product.stock);
            // console.log("Cantidades es: ", cadenaCantidades[i]);
            if (product.stock < cadenaCantidades[i]){
                stock = false;
            // res.status(400).json({ error: 'No hay stock para el producto' }); // no hay stock para un producto determinado
            }
        }
      }) 
    );


    if(stock){
        preference.back_urls.success = successUrl;
        const response = await mercadopago.preferences.create(preference);

        res.status(200).json({
        init_point: response.body.init_point,
        items: response.body.items,
        });
    }else {
        res.status(400).json({error: `No hay stock, actualice la pagina para ver el nuevo stock`})
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/pago-fallido", async (req, res) => {
  res.status(200).json({ msg: "pago fallido" });
});

router.get("/pago-pendiente", async (req, res) => {
  res.status(200).json({ msg: "pago pendiente" });
});

router.get("/pago-confirmado", async (req, res) => {
  try {
    const {
      idUser,
      quantity, // este
      price, // este
      total,
      idProduct, // este
      address,
      title, // este
      picture_url, // este
      description, // este

      collection_id, //: '56501258558',
      collection_status, //: 'approved',
      payment_id, //: '56501258558',
      status, //: 'approved',
      external_reference, //: 'null',
      payment_type, //: 'account_money',
      merchant_order_id, //: '8525169650',
      preference_id, //: '1325421814-aa67f6ba-8971-4960-855b-639c94320886',
      site_id, //: 'MLA',
      processing_mode, //: 'aggregator',
      merchant_account_id, //: 'null'
    } = req.query;

    // console.log("req query es: ", req.query)

    let cadenaCantidades = quantity.split(","); // ['1','2','1']
    let cadenaPrecios = price.split(","); // ['20.5','12....]
    let cadenaProductos = idProduct.split(",");
    let cadenaTitulos = title.split(",");
    let cadenaPicture = picture_url.split(",");

    let totalDeRegistros = cadenaCantidades.length;

    let nuevaOrden = await crearOrden(
      cadenaCantidades,
      cadenaPrecios,
      cadenaProductos,
      cadenaTitulos,
      cadenaPicture,
      totalDeRegistros,
      address,
      collection_id,
      preference_id,
      quantity,
      price,
      idUser,
      total,
      title,
      picture_url,
      description
    );
    if(!nuevaOrden) {
        res.status(400).json({ error: `No hay stock para el producto` });
    }
    await sendConfirmedPaymentEmail(
      idUser,
      cadenaCantidades,
      cadenaPrecios,
      cadenaTitulos
    );
    // const filePath = path.join(__dirname, '../utils/success.html');
    // res.sendFile(filePath);
    res.status(200).json({ msg: "pago confirmado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  res.status(200).json({ msg: "todo ok" });
});

router.put("/sendOrder/:idOrder", async (req, res) => {
  try {
    const { idOrder } = req.params;

    const selectedOrder = await Orders.findOne({
      where: {
        id: idOrder,
      },
    });

    if (selectedOrder) {
      const statusOfSelectOrder = await OrderStatus.findOne({
        where: {
          orderId: idOrder,
        },
      });

      if (statusOfSelectOrder.status === "pending") {
        statusOfSelectOrder.status = "sent";
        await statusOfSelectOrder.save();
        sendEmailOrderSent(selectedOrder.userId);
      }

      res.status(200).json(statusOfSelectOrder);
    } else {
      res.status(404).json({ msg: `Orden ${idOrder} inexistente` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      // const order = await Orders.findAll({
      //     where: {
      //         include: [
      //             {model: User},
      //             {model: Product},
      //             {model: Detail},
      //         ]
      //     },
      //     where: {
      //         userId: id
      //     }
      // })
      const order = await Orders.findAll({
        include: {
          model: User,
        },
        include: {
          model: Product,
        },
        where: {
          userId: id,
        },
      });
      if (order.length) {
        const status = await OrderStatus.findAll();
        const detail = await Detail.findAll({
          where: {
            orderId: order[0].id,
          },
        });

        const data = await order?.map((p) => {
          return {
            Nro: p.id,
            date: p.date,
            address: p.address,
            status: p.orderStatus,
            image: p.products.map((e) => e.image),
            nameAndQuantity: p.products.map((e) => {
              return e.name
                .concat(" (", e.detail.quantity, ") unit/s ")
                .concat(" Unit Price: $", e.detail.price);
            }),
            total: p.total,
            status: status
              .filter((s) => s.orderId == p.id)
              .map((e) => e.status),
          };
        });
        data.length
          ? res.status(200).send(data)
          : res.status(400).send("This user has no associated purchases");
      } else {
        res.status(400).send("This user has no associated purchases");
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
