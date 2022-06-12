const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../user/auth");

router.get("/login/federated/google", passport.authenticate("google"));
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/",
  })
);
router.post("/logout", function (req, res, next) {
  req.logout();
  res.redirect("http://localhost:3000/");
});

module.exports = router;
