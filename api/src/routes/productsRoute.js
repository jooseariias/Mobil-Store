const { Router } = require("express");
const { Product, Brand, Color, StorageCapacity} = require("../db.js");
const router = Router();


router.get("/", async (req, res) => {
    try {
        let { name } = req.query;
        const products = await Product.findAll({
            include : [ 
                { 
                  model:Brand, 
 
                }, 
                 
              ] ,
              include : [ 
                { 
                  model:Color, 
              
                }, 
                 
              ],
              include: [
                {
                  model:StorageCapacity
              } ]
        })
        if(name){
            let result = products.filter((e) =>
                e.name.toLowerCase().includes(name.toLowerCase())
            );
          
            result.length
                ? res.status(200).send(result)
                : res.status(404).send('name not found');
        } else {
            
            return res.status(200).send(products);
        }
    } catch (error) {
        console.log(error);
    }

})


// post

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      year,
      brandid,
      image,
      storageCapacityId,
      colorId
      
      
    } = req.body;
   
      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !year ||
        !brandid||
        !image||
        !storageCapacityId ||
        !colorId
        
       
      ) {
       res.status(400).send("you must complete all fields");
      } else {
        const createProduct = await Product.create({
         
          image,
          name,
          description,
          price,
          stock,
          year,
          enabled: true,
         // brandId:brand
        });
        // console.log("createProduct es: ", createProduct)
        const brand = await Brand.findOne({
          where :{
            id:brandid
          }
        })
        // console.log("brand es: ", brand)
        await createProduct.setBrand(brand);

        const color = await Color.findOne({
         where: {
           id: colorId
         }
       })
       //  console.log("color es: ", color)
        await createProduct.setColor(color); 
     
        const storageCapacity = await StorageCapacity.findOne({
          where: {
            id: storageCapacityId
          }
        })

        
        // //  console.log("storageCapacity es: ", storageCapacity)
          await createProduct.setStorageCapacity(storageCapacity); 
      
      // res.send(createProduct)
       res.status(200).json(createProduct);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//   get por id

router.get('/:id', async (req, res) => {
    const selected = await Product.findOne({
      where: {
        id: req.params.id
      },
    })
    if (selected) {
      res.status(200).send(selected)
    } else {
      res.send("id no existe").status(404)
    }
  })

  module.exports= router;