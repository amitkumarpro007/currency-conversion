const joi = require("joi");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");

const { joierrors } = require("../response/response");
const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

const bodyParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.body, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage.badRequest,
      error
    );
  } else {
    next();
  }
};

const calculateSchema = (req, res, next) => {
  const schema = joi.object({
    item: joi.string().required(),
    category: joi.string().required(),
    totalAmount: joi.number().required(),
    userType: joi
      .string()
      .valid("customer", "employee", "affiliate")
      .required(),
    customerTenure: joi.string().required(),
    originalCurrency: joi.string().required(),
    targetCurrency: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const loginSchema = (req, res, next) => {
  const schema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const registerSchema = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    mobileNo: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    userType: joi
      .string()
      .valid("customer", "employee", "affiliate")
      .required(),
    gender: joi.string().valid("male", "female", "others").required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

module.exports = {
  calculateSchema,
  loginSchema,
  registerSchema,
};
