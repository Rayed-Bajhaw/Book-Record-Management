// Data Transfer Object - Book

class IssuedBook {
  // class name always start with uppercase
  _id; // _id is a special keyword for auto generated id
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  // whenever create obj, the constructor gets invoked = parameterized constructor
  constructor(user) {
    // in js we dont write class name with constructor
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.issuedBy;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}
module.exports = IssuedBook;
