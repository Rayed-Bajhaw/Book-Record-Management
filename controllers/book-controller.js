const { UserModel, BookModel } = require("../models"); // by default it will go with /index  // UserModel,BookModel are tables

// const getAllBooks = () => {};
exports.getAllBooks = async (req, res) => {
  // async await will be used because connecting to database will take time
  const books = await BookModel.find(); // find() is mongodb method

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  res.status(200).json({
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

// module.exports = { getAllBooks, getSingleBookById };  // no need of this if using exports.getAllBooks = () => {};
