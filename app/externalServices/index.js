const axios = require("axios");
const getCurrencyExchageList = async (params) => {
  try {
    const response = await axios.get(
      `${process.env.CURRENCY_EXCHAGE_URL}/${process.env.CURRENCY_EXCHAGE_AUTH_KEY}/latest/${params.originalCurrency}`
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
module.exports = {
  getCurrencyExchageList,
};
