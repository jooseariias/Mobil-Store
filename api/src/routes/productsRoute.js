const { Router } = require("express");
const { Product, Brand,Feature} = require("../db.js");
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
                  model:Feature, 
                
                }, 
                 
              ] 
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
    const {
      name,
      description,
      price,
      stock,
      year,
      brand,
      image,
      featureId
      
    } = req.body;
   
    try {
      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !year ||
        !brand||
        !image||
        !featureId
        
       
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
          brandId:brand
        });
  
    
         const feature = await Feature.findAll({
                where:{
                  id:featureId
                }
          
          }); 
        
      //  createProduct.addBrand(brand);
        createProduct.addFeature(feature); 
       res.send(createProduct)
       // res.status(200).send("Product created successfully!");
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