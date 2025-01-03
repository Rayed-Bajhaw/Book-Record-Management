const { UserModel, BookModel } = require("../models");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    res.status(404).json({ success: false, message: "Book not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Found the book by their id", data: book });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook"); // it will attach if above is true

  // Data Transfer Object (DTO)

  const issuedBooks = users.map((each) => new IssuedBook(each));

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book have been issued yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the issued Books...",
    data: issuedBooks,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(404).json({
      success: false,
      message: "No data to add a book",
    });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: true,
    message: "book added successfully",
    data: allBooks,
  });
};

exports.updateBookBYId = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true, //for latest data
    }
  );
  res.status(201).json({
    success: true,
    message: "book updated successfully",
    data: updatedBook,
  });
};
