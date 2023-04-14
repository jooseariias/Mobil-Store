const { Router } = require('express');
const {Product,Review, Orders, Detail} = require("../db.js");


const router = Router();
//#region POST
router.post("/:idProduct", async (req,res)=>{
    try {
        const  { idUser, comment,score }= req.body
        const idProduct =req.params.idProduct
    
        if(!comment ||!score || !idProduct){
            res.status(400).send("You must complete all fields")
        }
        
        // const productBought = await Orders.findOne({
        //     include: [
        //       {
        //         model: Product,
        //         where: { id: idProduct },
        //       },
        //       {
        //         model: Detail,
        //         where: { productId: idProduct },
        //       },
        //     ],
        //     where: { userId: idUser },
        //   });
          
          const productBought = await Orders.findOne({
            include: {
                model: Product,
                where: { id: idProduct },
            },
            where: { userId: idUser },
            
          });

        if(productBought){

            const reviewForThatProduct = await Review.findOne({
                where: {
                    userId: idUser,
                    productId: idProduct
                }
            })
            if(!reviewForThatProduct){
                if(score>5 || score<1){
                    res.status(400).send("Enter a value from 1 to 5")
                }else{
                    const newReview= await Review.create({
                        comment,
                        score,
                        date: Date.now(), 
                        userId: idUser 
                    })
                    const productReview =await Product.findByPk(idProduct);
                    if (productReview) {
                        newReview.setProduct([productReview.id]);
                        res.status(200).send("Successful review!")
                    }else{
                        res.status(400).send("The product does not exist")
                    }

                }
            }else {
                res.status(400).send(`No se puede calificar el producto mas de una vez`)
            }
            
        }else{
            res.status(400).send(`Ud no puede hacer una review de un producto que no compro`)
        }

        
        } catch (error) {
            res.status(400).json({message: error.message})
        }          
})
//#region GET
router.get("/",async(req,res)=>{
    const review= await Review.findAll({
        include:{
            model:Product,
          
        }
    })
    review.length?
    res.status(200).send(review):
    res.status(400).send("Reviews not found")
})

router.get('/:idProduct', async (req, res) => {
    try {
        let reviewRes;
        const { idProduct } = req.params;

        const review = await Review.findAll({
          
            where: {
                productId: idProduct
            }
        }) 
        
        review.length ? res.status(200).json(review) : res.status(400).json("This product has no review ")
        // let Promedio = review.reduce((prev, current) => prev + current.score, 0) / review.length;
       
        // const num = Promedio;
        // const decimalPart = num % 1;
        // const roundedDecimalPart = decimalPart.toFixed(2);
     
        // if(roundedDecimalPart > 0.5){
        //    Promedio = Math.ceil(Promedio)
        // }else if(roundedDecimalPart < 0.5) {
        //    Promedio = Math.floor(Promedio)
        // }
        // if(Promedio){
        //     reviewRes= review.concat({promedio:Promedio})
        //     res.status(200).json(reviewRes)
        // }else{
         
        //     res.status(200).json("This product has no review ")
        // }
         
    }catch(error){
        res.status(400).json({error: error.message})
    }
})
//#endregion

//#region DELETE
router.delete("/:id", async (req,res)=>{
    const { id } = req.params
   
   try {
     const review= await Review.destroy({
          where:{
              id:id
          }
      }) ;
      if(!review) return res.status(400).json({massage:"Review does not exists"})
   
      res.status(200).send("Successfully deleted!")
      
   }
   catch(error){
   res.status(400).json({massage: error.message})
   }
  })
  //#endregion
module.exports= router