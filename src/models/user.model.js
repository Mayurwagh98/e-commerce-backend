import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const SignupSchem = new Schema(
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

module.exports = mongoose.model("Signup", SignupSchem);
