const express = require("express");

const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserData,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");

// const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");

const router = express.Router();

/*
 * Route : /users -> /
 * Method: GET
 * Description: get all users
 * Access: Public
 * Parameter: none
 */

// const { Router } = require("express");

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
router.get("/", getAllUsers);

/*
 * Route : /users/:id  -> /:id
 * Method: GET
 * Description: get single users by their id
 * Access: Public
 * Parameter: Id
 */

// router.get("/:id", (req, res) => {
//   // const id = req.params.id;
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     res.status(404).json({
//       success: false,
//       message: "user doesn't exist",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "user found",
//     data: user,
//   });
// });
router.get("/:id", getSingleUserById);

/*
 * Route : /users -> /
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameter: none
 */
// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   const user = users.find((each) => each.id === id); //to check whether this user with given id is present or not
//   if (user) {
//     res.status(404).json({
//       success: false,
//       message: "User with the id exists",
//     });
//   }
//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });
//   res.status(201).json({
//     success: true,
//     message: "user added successfully",
//     data: users,
//   });
// });
router.post("/", createNewUser);

/*
 * Route : /users/:id -> /:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameter: ID
 */
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user doesn't exist",
//     });
//   }
//   const updateUserData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each, // this ...each contains all fields of user of specified id ex: name,surname,etc
//         ...data, // thid ...data contains { "data":{ "name":"rohan", "surname":"kinnal" } } which we will give in body
//       };
//     }
//     return each; // this each will return remaining users details
//   });
//   return res.status(200).json({
//     success: true,
//     message: "user updated!",
//     data: updateUserData,
//   });
// });
router.put("/:id", updateUserData);

/*
 * Route : /users/:id -> /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameter: ID
 */
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     res.status(404).json({
//       success: false,
//       message: "user doesnt exist",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);
//   res
//     .status(200)
//     .json({ success: true, message: "user deleted..", data: users });
// });
router.delete("/:id", deleteUser);

/*
 * Route : /users/subscription-details/:id
 * Method: Get
 * Description: Get all user subscription details
 * Access: Public
 * Parameter: ID
 */
// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User with the ID didnt exist",
//     });
//   }
//   const getDateInDays = (data = "") => {
//     let date;
//     if (data == "") {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     let days = Math.floor(date / (1000 * 60 * 60 * 24)); // (mili_seconds * seconds * minutes * hours)
//     return days;
//   };
//   const subscriptionType = (date) => {
//     if (user.subscriptionType == "Basic") {
//       date = date + 90;
//     } else if (user.subscriptionType == "Standard") {
//       date = date + 180;
//     } else if (user.subscriptionType == "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };
//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subsctionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subsctionDate);
//   const data = {
//     ...user,
//     isSubscriptionExpired: subscriptionExpiration <= currentDate,
//     daysLeftForExpiration:
//       subscriptionExpiration <= currentDate
//         ? 0
//         : subscriptionExpiration - currentDate,
//     fine:
//       returnDate < currentDate
//         ? subscriptionExpiration < currentDate
//           ? 100
//           : 50
//         : 0,
//   };
//   return res.status(200).json({
//     success: true,
//     message: "Subscription details for the user is : ",
//     data,
//   });
// });
router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
