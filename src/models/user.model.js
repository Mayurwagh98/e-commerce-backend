const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

UserSchema.methods.validatePassword = async function (passwordSentWhileLogin) {
  const user = this;

  const isValidPassword = await bcrypt.compare(
    passwordSentWhileLogin,
    user.password
  );
  return isValidPassword;
};

module.exports = mongoose.model("User", UserSchema);
