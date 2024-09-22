const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  userLoginService,
  userRegisterService,
} = require("../services/auth.service");
const userLogin = async (req, res) => {
  const params = req.body;
  const result = await userLoginService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};
const userRegister = async (req, res) => {
  const params = req.body;
  const result = await userRegisterService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};
module.exports = {
  userLogin,
  userRegister,
};
