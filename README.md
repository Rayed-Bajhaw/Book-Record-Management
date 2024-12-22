#Routes and Endpoints

## /users

POST: Creating a new user
GET: Get all the users

## /users/{id}

GET: Get user by id
PUT: Updating a user by their ID
DELETE: Delete a user by id (chk if he/she still have an issued book) && (is there any fine to paid)

## /users/subscription-details/{id}

GET: Get user subscription details >> Date of Subscription >>Valid till >>Is there any fine

## /books

GET: Get all the books
POST: Create/Add a new book

## /books/{id}

GET: Get a book by id
PUT: Update a book by id

## /books/issued

GET: Get all issued books

## /books/issued/withFine

GET: Get all issued books with their fine
