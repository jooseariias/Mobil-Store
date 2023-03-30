const { Router } = require("express");
const { Gender, Brand, Product } = require("../db.js");
const router = Router();

router.post('/db', async (req, res) => {
    let phones = [
        {
            id: 1,
            name: "iPhone 13 Pro",
            description: "iPhone 13 Pro. El mayor avance en el sistema de cámaras Pro de Apple hasta ahora. Pantalla Super Retina XDR con ProMotion que brinda una respuesta más rápida y fluida. Chip A15 Bionic para un rendimiento fuera de serie. Diseño resistente y un gran salto en duración de batería.",
            price: 60,
            image: "https://http2.mlstatic.com/D_NQ_NP_755977-MLA47780164967_102021-O.webp",
            stock: 15,
            year: 2021
        },
        {
            id: 2,
            name: "iPhone 12 Pro",
            description: "iPhone 13 Pro. El mayor avance en el sistema de cámaras Pro de Apple hasta ahora. Pantalla Super Retina XDR con ProMotion que brinda una respuesta más rápida y fluida. Chip A15 Bionic para un rendimiento fuera de serie. Diseño resistente y un gran salto en duración de batería.",
            price: 60, 
            image: "https://http2.mlstatic.com/D_NQ_NP_755977-MLA47780164967_102021-O.webp",
            stock: 20,
            year: 2020
        },
        {
            id: 3,
            name: "Galaxy S20",
            description: "Samsung Galaxy S20 y S20+: la era 5G de Samsung despierta con más pantalla, soporte de 120 Hz y cámaras más versátiles que nunca",
            price: 70,
            image: "https://culturageek.com.ar/wp-content/uploads/2020/12/1366_2000.jpg",
            stock: 30,
            year: 2020
        }
];
try {
    let newProduct = "";
    let brand = "";

    phones.forEach(async (phone, index) => {
        [newProduct, created] = await Product.findOrCreate({
            where: {
                name: phone[index].name,
                image: phone[index].image,
                description: phone[index].description,
                price: phone[index].price,
                stock: phone[index].stock,
                year: phone[index].year,
                enabled: phone[index].enabled
            }
        });
        // if(created){
        //     brand = await Brand.findAll({
        //         where: {
        //             name: phones[index].
        //         }
        //     })
        // }
    })
}catch(error){

}

})

module.exports= router;