const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { USER_TYPE, CATEGORY } = require("../configs/constants");
const { getCurrencyExchageList } = require("../externalServices/index");
const currencyConversion = async (amount, originalCurrency, targetCurrency) => {
  //Currency Conversion Logic
  let allCurrencyList = await getCurrencyExchageList({
    originalCurrency: originalCurrency,
  });
  if (
    allCurrencyList &&
    allCurrencyList.result &&
    allCurrencyList.result == "success"
  ) {
    if (allCurrencyList.conversion_rates[targetCurrency]) {
      let convertAmount =
        amount * allCurrencyList.conversion_rates[targetCurrency];
      return { status: true, finalAmount: convertAmount };
    } else {
      return { status: false, finalAmount: 0 };
    }
  } else {
    return { status: false, finalAmount: 0 };
  }
};
const discountApply = async (params) => {
  //Discounts logic
  let discountValue = 0;
  if (
    params.userType == USER_TYPE.CUSTOMER &&
    +params.customerTenure >= 2 &&
    params.category != CATEGORY.GROCERIES
  ) {
    // If the user has been a customer for over 2 years, they get a 5% discount.
    discountValue = (params.totalAmount / 100) * 5;
  } else if (
    params.userType == USER_TYPE.EMPLOYEE &&
    params.category != CATEGORY.GROCERIES
  ) {
    // If the user is an employee of the store, they get a 30% discount.
    discountValue = (params.totalAmount / 100) * 30;
  } else if (
    params.userType == USER_TYPE.AFFILIATE &&
    params.category != CATEGORY.GROCERIES
  ) {
    //If the user is an affiliate of the store, they get a 10% discount.
    discountValue = (params.totalAmount / 100) * 10;
  }
  if (params.totalAmount >= 100) {
    //For every $100 on the bill, there is a $5 discount.
    discountValue = discountValue > 0 ? discountValue + 5 : 5;
  }
  return discountValue;
};
const calculateTotalService = async (params) => {
  //Discounts and Currency Conversion Logic API
  try {
    let discountValue = await discountApply(params); // discount calculate
    let payableAmount = +params.totalAmount - +discountValue;
    let { status, finalAmount } = await currencyConversion(
      payableAmount,
      params.originalCurrency,
      params.targetCurrency
    ); // currency conversion
    if (status) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: statusMessage.success,
        data: {
          payableAmount: finalAmount,
          request: { ...params },
        },
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: statusMessage.invalidCurrency,
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
module.exports = {
  calculateTotalService,
};
