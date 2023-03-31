const { Router } = require("express");
const { Brand, Product, Color, StorageCapacity } = require("../db.js");
const router = Router();

router.post('/', async (req, res) => {
try {
    let telefonos = [
        {
          id: 1,
          name: "Moto G52",
          description: "It has 6 GB of RAM, 128 GB of internal storage and an ultra-fast Octa Core processor, great performance for gaming and streaming videos..",
          price: "70",
          image: "https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/g/5/g52-negro-frente_1.png",
          stock: 25,
          year: 2022,
          enabled: true,
          brandId: 6,
          brand: {
            id: 6,
            name: "Motorola",
            "logo": "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
          },
          colorId: 1,
          storageCapacityId: 3


        },
        {
          id: 2,
          name: "Galaxy S23 ULTRA Phantom black",
          description: "The Samsung Galaxy S23 offers 8 GB of RAM and 128 GB, 256 GB or 512 GB as internal storage options. The Samsung Galaxy S23+ offers 8 GB of RAM and 256 GB or 512 GB as internal storage options. The Samsung Galaxy S23 Ultra has 8 GB RAM or 12 GB RAM, 256 GB, 512 GB or 1 TB internal storage options.​",
          price: "75",
          image: "https://samsungar.vtexassets.com/arquivos/ids/186715-800-auto?width=800&height=auto&aspect=true",
          stock: 15,
          year: 2023,
          enabled: true,
          brandId: 1,
          brand: {
            id: 1,
            name: "Samsung",
            "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
          },
          colorId: 2,
          storageCapacityId: 4
        },
        {
          id: 3,
          name: "A52",
          description: "Galaxy A52 5G and Galaxy A72: Samsung's new upper-middle range has a Galaxy S21 design, up to 120 Hz and water resistance​",
          price: "69",
          image: "https://zelucashdev.s3.sa-east-1.amazonaws.com/uploads/telefono/modelo/Familia%20A/A52/A52_Blue_Back_800.png",
          stock: 10,
          year: 2021,
          enabled: true,
          brandId: 1,
          brand: {
            id: 1,
            name: "Samsung",
            "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
          },
          colorId: 3,
          storageCapacityId: 5
        },
        {
          id: 4,
          name: "moto g82",
          description: "The Moto G82 5G offers us a set of configurations that provides us with very good performance, autonomy that does not clash and a quality camera for good light conditions. For its price, this equipment is one of the best options in the Moto G line.​",
          price: "69",
          image: "https://armoto.vtexassets.com/arquivos/ids/162602-800-auto?v=638097391512370000&width=800&height=auto&aspect=true",
          stock: 14,
          year: 2022,
          enabled: true,
          brandId: 6,
          brand: {
            id: 6,
            name: "Motorola",
            "logo": "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
          },
          colorId: 6,
          storageCapacityId: 2
        },
        {
          id: 5,
          name: "IPHONE 13 PRO 512GB SILVER",
          description: "El iPhone 13 Pro Max es el terminal de mayor tamaño de la gama que cuenta con un procesador A15 Bionic y un equipo fotográfico formado por tres cámaras de 12 Mpx.​",
          price: "69",
          image: "https://www.megatone.net/images/Articulos/zoom2x/209/01/MKT0243ETC.jpg",
          stock: 11,
          year: 2021,
          enabled: true,
          brandId: 7,
          brand: {
            id: 7,
            name: "Apple",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
          },
          colorId: 7,
          storageCapacityId: 7
        },
        {
          id: 6,
          name: "samsung s10",
          description: "anda",
          price: "30",
          image: "#",
          stock: 10,
          year: 2022,
          enabled: true,
          brandId: 1,
          brand: {
            id: 1,
            name: "Samsung",
            "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
          },
          colorId: 3,
          storageCapacityId: 6
        },
        {
          id: 7,
          name: "Iphone 12",
          description: "anda",
          price: "200",
          image: "#",
          stock: 10,
          year: 2022,
          enabled: true,
          brandId: 7,
          brand: {
            id: 7,
            name: "Apple",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
          },
          colorId: 6,
          storageCapacityId: 8
        },
      ]
    let newProduct = "";
    let created;
    let brand = "";
    let colorete = "";
    let capacidad = "";

    for(let index in telefonos){
      [newProduct, created] = await Product.findOrCreate({
        where: {
          name: telefonos[index].name,
          description: telefonos[index].description,
          price: telefonos[index].price,
          image: telefonos[index].image,
          stock: telefonos[index].stock,
          year: telefonos[index].year,
          enabled: telefonos[index].enabled
        }
    });

    if (created) {
      // console.log("telefono brand", telefonos[index])
      brand = await Brand.findOne({
        where: {
          id: telefonos[index].brandId,
        },
      });
      // console.log(brand)
      // console.log("brand es: ", brand.id)
      await newProduct.setBrand(brand);

      colorete = await Color.findOne({
        where: {
          id: telefonos[index].colorId
        }
      })
      await newProduct.setColor(colorete)

      capacidad = await StorageCapacity.findOne({
        where: {
          id: telefonos[index].storageCapacityId
        }
      })
      await newProduct.setStorageCapacity(capacidad)

    }else {
      console.log('no creado')
    }

  }
    res.status(200).json(newProduct)
}catch(error){
    res.status(500).json({error: error.message})
}

})

module.exports= router;