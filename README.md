# Social Media Clone
A basic social media website I created to further my understanding of full stack web development.
Roughly based off of twitter, you can create and delete accounts, as well as create, edit, comment on, and delete posts.

## Current state
Currently has all required functionality of orignal plans. May add more in the future. Currently looks ugly but demonstrates
knowledge of basic css positioning, colors, dynamic sizing, and menu styling.

## How to use
Currently only the backend is fully functional. This can be tested using the browser or PostMan.
- clone git repo
- use postman or browser to go to localhost:9000
- use localhost:9000/user_api or localhost:9000/post_api
- when posting, ensure you follow the user or post model

### User Model
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    }

### Post Model    
    {
        username: {type: String, required: true},
        message: {type: String, required: true},
        comments: {type: [Comment], required: true}
    }

    type Comment = {
        name: string
        response: string
    }

## API calls
### User API
- POST - /create - Takes JSON object following user model
- POST - /auth - Takes user info, ensures that password given matches password stored. Should only be called for users that are already created
- GET - /:username - Pass username parameter and get the user info. All usernames should be unique (Ensure in frontend)
- DELETE - /:username - Deletes user with matching name
- DELETE - /delete/all - Deletes all users in DB

### Post API
- POST - /create - Creates new post with given JSON, for new post pass in empty comments array
- GET - /search/message/:message - returns all posts that contain :message in their message contents
- GET - /search/name/:username - returns all posts made by a user
- GET - /search/all - returns all posts. Should only be called once to load homepage.
- GET - /search/comments/:id - returns all comments on a post with :id in the _id field
- DELETE - /delete/:id - deletes post with matching :id
- DELETE - /delete_all - deletes all posts and comments
- PUT - /edit/:id - Edits post with matching :id. Pass post message, _id, and comments. Used to edit posts if required, no frontend connection use yet.
- PUT - /comments/edit/:id - Adds a comment to the list of comments for the post with specified id

## Backend todo (Extra)
- Add images to db

## Frontend todo
- Add images for profiles