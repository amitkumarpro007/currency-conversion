const express = require("express");
const Router = express.Router;
const {
  calculateSchema,
  loginSchema,
  registerSchema,
} = require("../validator/validator");
const { calculateTotal } = require("../controllers/calculate.controller");
const { userLogin, userRegister } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/authentication");
const { errHandle } = require("../helpers/index");
const { routes } = require("../routes/routes");

const router = Router();

router.post(
  routes.v1.CALCULATE,
  [verifyToken],
  [calculateSchema],
  errHandle(calculateTotal)
);

//auth api
router.post(routes.v1.AUTH.LOGIN, [loginSchema], errHandle(userLogin));
router.post(routes.v1.AUTH.REGISTER, [registerSchema], errHandle(userRegister));
module.exports = router;
