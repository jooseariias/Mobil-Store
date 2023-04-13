const { Router } = require("express");
const router = Router();

const { User, Cart, Productcart } = require("../../db");

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {
    let cart = await Cart.findOne({
      include: [
        {
          model: User,
          where: { id: id },
        },
        {
          model: Productcart,
        },
      ],
      order: [[Productcart, "createdAt", "DESC"]],
    });

    console.log("CARRITO", cart);

    if(cart.productcarts.length === 0) return res.status(200).send([]);

    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;