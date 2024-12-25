const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Schema is a chall name S should be in upper case

const bookSchema = new Schema(
  {
    // id will be auto generated in Mongo DB
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
