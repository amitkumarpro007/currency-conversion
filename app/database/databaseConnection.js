const mongoose = require("mongoose");

const verifyDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
module.exports = {
  verifyDBConnection,
};
