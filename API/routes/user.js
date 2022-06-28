const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.post("/create_user", controller.createUser);
router.post("/login", controller.Login);
router.get("/check_login", controller.isLoggedIn);
router.get("/logout", controller.Logout);
router.get("/token/:token", controller.VerifyToken);
router.post("/reset_password", controller.SendResetPassword);
router.post("/reset_confirm", controller.Password_Confirm);

module.exports = router;
