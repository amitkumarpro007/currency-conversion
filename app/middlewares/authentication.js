const { sendErrorResponse } = require("../response/response");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers["x-access-token"] ||
      req.headers["authorization"] ||
      req.headers["Authorization"]
    ) {
      let token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["Authorization"];
      token = token.replace("Bearer ", "");
      let decode, user;
      decode = jwt.verify(token, process.env.JWT_SECRET);
      user = await Users.findOne({
        UserId: decode.data.UserId,
      }).lean();
      if (user) {
        req.user = user;
        next();
      } else {
        return sendErrorResponse(
          req,
          res,
          statusCodes.HTTP_UNAUTHORIZED,
          messages.tokenExpired,
          []
        );
      }
    } else {
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.tokenEmpty,
        []
      );
    }
  } catch (error) {
    return sendErrorResponse(
      req,
      res,
      statusCodes.HTTP_UNAUTHORIZED,
      messages.tokenExpired,
      []
    );
  }
};
module.exports = { verifyToken };
