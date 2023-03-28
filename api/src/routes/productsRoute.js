const { Router } = require("express");
const { Product, Brand} = require("../db.js");
const router = Router();


router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll({
            include : [ 
                { 
                  model:Brand, 
                  attributes : [ 'brand'] ,
                  through:{
                    attributes:[]
                  }
                }, 
                 
              ] 
        })
        if(products){
            res.send(products).status(200)
        }else{
            res.json({msg: "products not found"}).status(404)
        }
       
    } catch (error) {
        return error.message
    }

})


// post

router.post("/", async (req, res) => {
    const {
      name,
      description,
      price,
      stock,
      year,
      brandName,
      image,
    } = req.body;
   
    
    try {
      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !year ||
        !brandName ||
        !image
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
        });
  
        const brand = await Brand.findAll({
          where: {
            brand: brandName,
          },
        });
        

      
        createProduct.addBrand(brand);
        
        res.status(200).send("Product created successfully!");
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