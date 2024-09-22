const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { Users } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateJwtToken = async (data) => {
  try {
    let secretKey = process.env.JWT_SECRET;
    return jwt.sign({ data: data }, secretKey);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const userLoginService = async (params) => {
  //user login
  try {
    const data = await Users.findOne({
      $or: [{ email: params?.userName }, { mobileNo: params?.userName }],
    }).lean();
    if (data) {
      const isMatch = await bcrypt.compare(params?.password, data.password);
      if (!isMatch) {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_BAD_REQUEST,
          message: statusMessage.invalidPwd,
          data: [],
        };
      }
      const jwtData = {
        UserId: data.UserId,
        email: data.email,
        mobileNo: data.mobileNo,
        name: data.name,
      };
      const token = await generateJwtToken(jwtData);
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: statusMessage.success,
        data: {
          token: token,
          user: data,
        },
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: statusMessage.userNotExist,
        data: [],
      };
    }
  } catch (err) {
    console.log("err", err);
    return {
      status: false,
      statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
      message: err,
      data: [],
    };
  }
};
const userRegisterService = async (params) => {
  //user Register
  try {
    const data = await Users.findOne({
      $or: [{ email: params?.email }, { mobileNo: params?.mobileNo }],
    }).lean();
    if (data) {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: statusMessage.alreadyExist,
        data: [],
      };
    }
    const password = params?.password;
    //encrypt given original password by bcrypt
    params.password = await bcrypt.hash(password.toString(), 10);
    const users = new Users(params);
    const details = await users.save();
    return {
      status: true,
      statusCode: statusCodes?.HTTP_CREATED,
      message: statusMessage.userCretaed,
      data: {
        _id: details._id,
      },
    };
  } catch (err) {
    console.log("err", err);
    return {
      status: false,
      statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
      message: err,
      data: [],
    };
  }
};
module.exports = {
  userLoginService,
  userRegisterService,
};
