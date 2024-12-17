const express = require("express");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books"); //we can alco write books.js

const app = express();

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
  //allways keep generic condition on bottom otherwise it will execute first
  res.status(404).json({
    message: "this root is not present",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
