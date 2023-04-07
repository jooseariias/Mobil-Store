const { Router } = require("express");
const { User } = require("../db");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log("SERVER", email, password);

  const user = await User.findOne({
    where: { email: email, },
  });

  if(!user) return res.status(401).send({message: "Email is invalid"});

  if(bcrypt.compareSync(password, user.password)){
      return res.status(200).json({
        msg: "Login success",
        data: {
          ...user,
          token: generateToken(user),
        },
      });
  }
    
  else return res.status(401).send({message: "The password is invalid"});
  
});

module.exports = router;
