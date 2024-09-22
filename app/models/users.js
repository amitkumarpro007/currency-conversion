const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return "EMP-" + now.slice(0, 3) + now.slice(10, 13);
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      default: "male",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("users", usersSchema);
// export default users;
module.exports = { Users };
