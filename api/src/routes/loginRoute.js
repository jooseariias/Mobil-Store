const { Router } = require("express");
const { User } = require("../db");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const router = Router();

router.post("/", async (req, res) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email, },
  });

  if(!user || !user.password) return res.status(401).send({message: "Email or Password is invalid"});

  if(bcrypt.compareSync(password, user.password)){
      return res.status(200).json({
        message: "You have been successfully validated",
        data: {
          ...user,
          token: generateToken(user),
        },
      });
  }
    
  else return res.status(401).send({message: "Email or Password is invalid"});
  
});

module.exports = router;
