const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/*
 * Route : /users -> /
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameter: none
 */

const { Router } = require("express");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
 * Route : /users/:id  -> /:id
 * Method: GET
 * Description: get single users by their id
 * Access: Public
 * Parameter: Id
 */

router.get("/:id", (req, res) => {
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
 * Route : /users -> /
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameter: none
 */
router.post("/", (req, res) => {
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
 * Route : /users/:id -> /:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameter: ID
 */
router.put("/:id", (req, res) => {
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
 * Route : /users/:id -> /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameter: ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user doesnt exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res
    .status(200)
    .json({ success: true, message: "user deleted..", data: users });
});

module.exports = router;
