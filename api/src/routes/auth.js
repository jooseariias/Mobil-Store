const { Router } = require("express");
const passport = require("passport");
const CLIENT = process.env.CLIENT;
require("../utils/passport");
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const router = Router();

router.get('/login/success', (req, res) => {

  if(req.user) {
    res.status(200).json({
      success: true,
      message: 'Succesy!',
      user: req.user,
    })  
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "ERROR, PA",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"] ));
  
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT,
    failureRedirect: "/login/failed",
  })
  );
  

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT);
});

module.exports = router;