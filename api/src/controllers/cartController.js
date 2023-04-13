const  { User, Cart, Productcart, Product, Brand  }  = require("../db")

const updateTotalValue = async(cart) => {
    //busco los productos cargados en el carrito y calculo el total
    let loadedProducts = await Productcart.findAll({where: { cartId: cart.id}});
    let totalCart = await loadedProducts.map(e => e.totalValue).reduce((a,b)=> a+b,0);

    return await cart.update({ priceCart: totalCart});
}

const addProductCart = async(req, res) => {

    try {
        const { productId, userId} = req.body;

        let user = await User.findOne({
            where: { id: userId}
        })

        let product = await Product.findOne({
            where: { id: productId}
        })

        let brand = await Brand.findOne({
            where: { id: product.brandId }
        })

        let cart = null;
        
        if(!user.cartId) {
            cart = await Cart.create({ priceCart: product.price });
            await user.update({ cartId: cart.id});
        }else {
        
            cart = await Cart.findOne({
                where: { id: user.cartId },
                include: { model: Productcart}
            });
        }    

        let findProduct = await cart.productcarts?.find(e => e.productId == productId);
        if(findProduct){
            return res.status(400).send({message: 'The product is already in your cart'});
        }else {
            let totalValue = product.price;
            await Productcart.create({
                quantity:1,
                totalValue,
                cartId: cart.id,
                productId: product.id,
                name:product.name,
                img:product.image,
                brand: brand.name,
                priceProduct:product.price
            });

            await updateTotalValue(cart);
            
            return res.status(200).send({message: 'The product was added to your cart'});
        }

    } catch (err) {
        console.log(err)
    }
} 

const deleteProductCart = async (req, res) => {
    try {
        const { productCardId } = req.query;
        let productCart = await Productcart.findOne({
        where: { id: productCardId }
    });
    if(!productCart){
        res.status(404).send("no se puede eliminar un producto que no agregaste tonto ")
    }
    await productCart.destroy();

    const cart = await Cart.findOne({ where: { id: productCart.cartId} });
    updateTotalValue(cart); 
    res.status(200).send('Product has been removed');
    } catch (error) {
        console.log(error)
    }
};


module.exports = {addProductCart,deleteProductCart,updateTotalValue}