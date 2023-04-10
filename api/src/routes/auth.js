const { Router } = require("express");
const passport = require("passport");
const { User } = require("../db");
const CLIENT = "http://localhost:5173/";
require("../utils/passport");
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  async(req, res) => {
    
    // Establece las cookies con los datos del usuario
    
    const datos = await User.findOne({
      where:{email : req.user.email}
    })    

    

if(datos){

    const data = {
      id: datos.dataValues.id,
      name: req.user.given_name,
      last_name: req.user.family_name,
      email: req.user.email,
      rol: datos.dataValues.rol,
      image:req.user.photos && req.user.photos.length > 0 ? req.user.photos[0].value : null
    }

    res.cookie('user_data', JSON.stringify(data));
    res.redirect(CLIENT);

}else{
  const userCreate = await User.create({
    name: req.user.displayName,
    surname:req.user.displayName,
    email:req.user.email,   
    image:req.user.photos && req.user.photos.length > 0 ? req.user.photos[0].value : null
  });
  res.cookie('user_data', JSON.stringify(data));
  res.redirect(CLIENT);
}
  })

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

module.exports = router;