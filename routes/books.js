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
// router.get("/issued", (req, res) => {
//   const usersWithTheIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });
//   const issuedBooks = [];
//   usersWithTheIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);

//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
//   });
//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Book have been issued yet..",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Users with the issued Books...",
//     data: issuedBooks,
//   });
// });

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
 * Route : /
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameter: none
 * Data: id, name, author, genre, price, publisher
 */
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(404).json({
      success: false,
      message: "No data to add a book",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "id already exist",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added Book successfully",
    data: allBooks,
  });
  // const { id, name, author, genre, price, publisher } = req.body;

  // const book = books.find((each) => each.id === id);

  // if (book) {
  //   res.status(404).json({
  //     success: false,
  //     message: "book with the id exist",
  //   });
  // }

  // books.push({
  //   id,
  //   name,
  //   author,
  //   genre,
  //   price,
  //   publisher,
  // });
  // res.status(201).json({
  //   success: true,
  //   message: "book added successfully",
  //   data: books,
  // });
});

/*
 * Route : /:id
 * Method: PUT
 * Description: Updating a book by its ID
 * Access: Public
 * Parameter: none
 * Data: id, name, author, genre, price, publisher
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
        ...each, //  ... is called spread operator
        ...data, // it will update each(books) with data which is latest one
      };
    }
    return each;
  });
  res.status(201).json({
    // 201 is for insertion
    success: true,
    message: "book updated successfully",
    data: updateBookData,
  });
});

/*
 * Route : /books/issued/by_user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: none
 */
router.get("/issued/by_user", (req, res) => {
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

module.exports = router;
