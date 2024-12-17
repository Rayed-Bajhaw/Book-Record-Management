const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/*
 * Route : /books
 * Method: GET
 * Description: getting all books
 * Access: Public
 * Parameter: none
 */
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Got all the Books", data: books });
});

/*
 * Route : /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: none
 */
router.get("/issued", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
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
});

/*
 * Route : /books/:id
 * Method: GET
 * Description: get books by their id
 * Access: Public
 * Parameter: none
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res.status(404).json({ success: false, message: "Book not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Found the book by their id", data: book });
});

/*
 * Route : /books
 * Method: GET
 * Description: Create a new book
 * Access: Public
 * Parameter: none
 */
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;

  const book = books.find((each) => each.id === id);

  if (book) {
    res.status(404).json({
      success: false,
      message: "book with the id exist",
    });
  }

  books.push({
    id,
    name,
    author,
    genre,
    price,
    publisher,
  });
  res.status(201).json({
    success: true,
    message: "book added successfully",
    data: books,
  });
});

/*
 * Route : /books/:id
 * Method: PUT
 * Description: Updating a book by ID
 * Access: Public
 * Parameter: none
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "Book does'nt exist" });
  }
  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(201).json({
    success: true,
    message: "book updated successfully",
    data: updateBookData,
  });
});

module.exports = router;
