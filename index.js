const express = require("express");

const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running :-",
  });
});

/*
 * Route : /user
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameter: none
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  //allways keep generic condition on bottom otherwise it will execute first
  res.status(404).json({
    message: "this root is not present",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
