const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();
const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running :-",
  });
});

app.use("/users", userRouter); // all url start with /users is passed to users.js file
app.use("/books", bookRouter); // all url start with /books is passed to books.js file

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this root is not present",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
