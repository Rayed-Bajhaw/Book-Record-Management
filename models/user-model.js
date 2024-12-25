const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Schema is a chall name S should be in upper case

const userSchema = new Schema(
  {
    // id will be auto generated in Mongo DB
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issuedBook: {
      // it is a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // from which table to refer foreign key
      required: false,
    },
    returnDate: {
      type: "String",
      required: false,
    },
    subscriptionType: {
      type: "String",
      required: true,
    },
    subscriptionDate: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
