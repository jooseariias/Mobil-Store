const axios = require("axios");
require("dotenv").config();

// const orderId = require("../routes/routePayments.js");
const {
  User,
  Orders,
  Platform,
  Product,
  Detail,
  OrderStatus,
  Op,
} = require("../db");

const crearOrden = async (
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
) => {
  let flag = true;
  for (let i = 0; i < cadenaProductos.length; i++) {
    const product = await Product.findOne({
      where: {
        id: parseInt(cadenaProductos[i]),
      },
    });
    // console.log("Stock es: ", product.stock);
    // console.log("Cantidades es: ", cadenaCantidades[i]);
    if (product.stock < cadenaCantidades[i]){ 
      flag = false;
      return false; // no hay stock para un producto determinado
    }
  }
  console.log(flag)
  if (flag)
    axios
      .get(`https://api.mercadopago.com/v1/payments/${collection_id}`, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        },
      })
      .then(async (response) => {
        //   console.log("response en crear orden: ", response)

        const user = await User.findOne({
          where: {
            id: idUser,
          },
        });

        let totalOrder = 0;
        for (let i = 0; i < cadenaProductos.length; i++) {
          totalOrder +=
            parseFloat(cadenaPrecios[i]) * parseInt(cadenaCantidades[i]);
          // console.log("total de la orden: ", totalOrder)
        }

        // console.log("Total de la orden: ", totalOrder)
        const order = await Orders.create({
          id: preference_id,
          // idProduct,
          // quantity,
          // price,
          address,
          idUser,
          total: totalOrder,
          date: Date.now(),
        });

        await order.setUser(user.id);

        // Crear el objeto 'product_order'
        // const product_order = await order.createProductOrder();

        for (let i = 0; i < cadenaProductos.length; i++) {
          // console.log(parseInt(cadenaProductos[i]))
          // console.log(ProductOrder)
          // Agregar los productos a la orden utilizando el objeto 'product_order'
          // console.log("product_order", ProductOrder.orderId.prototype)

          const product = await Product.findOne({
            where: {
              id: parseInt(cadenaProductos[i]),
            },
          });

          // console.log("total de la orden: ", totalOrder)
          // console.log('stock anterior: ', product.stock)
          product.stock -= parseInt(cadenaCantidades[i]);
          await product.save();

          // console.log('nuevo stock: ', product.stock)

          let [productoOrden, created] = await Detail.findOrCreate({
            where: {
              productId: parseInt(cadenaProductos[i]),
              orderId: order.id,
              quantity: parseInt(cadenaCantidades[i]),
              price: parseFloat(cadenaPrecios[i]),
              discount: 0,
            },
          });

          // console.log("productoOrden: ", productoOrden)
          // console.log("created: ", created)
        }

        const statusOrder = await OrderStatus.create({
          address,
          status: "pending",
        });

        await statusOrder.setOrder(order.id);
      })
      .catch((error) => console.error(error.message));
    else {
      return false
    }
};

module.exports = { crearOrden };
