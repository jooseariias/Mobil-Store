const { Router } = require("express");
const passport = require("passport")
const {User} = require("../db")
 const CLIENT = "http://localhost:5173/"
require("../utils/passport")
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

const router = Router();

router.get('/', (req, res) => {
    res.send('<a href="http://localhost:3001/auth/google">Authenticate with Google</a>');
  });
  
  router.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    
  ));
  
router.get( '/auth/google/callback',
  
    passport.authenticate( 'google', {
      successRedirect: CLIENT,
      failureRedirect: '/auth/google/failure'
    })
  );
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
  })

  
  router.get('/protected',  isLoggedIn, async(req, res) => {


      const data = await User.findOne({
        where:{email : req.user.email}
      })    

      if(data){
        res.json(data);
      }else{

   const data= await User.create({
          name: req.user.displayName,
          surname:req.user.displayName,
          email:req.user.email,   
         image:req.user.photos && req.user.photos.length > 0 ? req.user.photos[0].value : null
        });
  
        res.json(data)
      }
    })
  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });
  
  router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
  
  module.exports=router;