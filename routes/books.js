const express = require("express");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookBYId,
} = require("../controllers/book-controller");

const { UserModel, BookModel } = require("../models/index"); //  or

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBookById);

router.post("/", addNewBook);

router.put("/updateBook/:id", updateBookBYId);

router.get("/issued/by_user", getAllIssuedBooks);

module.exports = router;
