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
 * Route : /users
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

/*
 * Route : /users/:id
 * Method: GET
 * Description: get single users by their id
 * Access: Public
 * Parameter: Id
 */

app.get("/users/:id", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user doesn't exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});

/*
 * Route : /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameter: none
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id); //to check whether this user with given id is present or not
  if (user) {
    res.status(404).json({
      success: false,
      message: "User with the id exists",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(201).json({
    success: true,
    message: "user added successfully",
    data: users,
  });
});

/*
 * Route : /users/:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameter: ID
 */
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each, // this ...each contains all fields of user of specified id ex: name,surname,etc
        ...data, // thid ...data contains { "data":{ "name":"rohan", "surname":"kinnal" } } which we will give in body
      };
    }
    return each; // this each will return remaining users details
  });
  return res.status(200).json({
    success: true,
    message: "user updated!",
    data: updateUserData,
  });
});

/*
 * Route : /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameter: ID
 */
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user doesnt exist",
    });
  }
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
