const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const { calculateTotalService } = require("../services/calculate.service");
const calculateTotal = async (req, res) => {
  const params = req.body;
  const result = await calculateTotalService(params);
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
  calculateTotal,
};
