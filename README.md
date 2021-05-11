# Social Media Clone
A basic social media website I created to further my understanding of full stack web development.
Roughly based off of twitter, you can create and delete accounts, as well as create, edit, comment on, and delete posts.

## Current state
Before creating the github repo I had already completed the backend functionality, currently working on creating the frontend
using ReactJS and Sass.

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
        comments: {type: [String], required: true}
    }

## API calls
### User API
- POST - /create - Takes JSON object following user model
- POST - /auth - Takes user info, ensures that password given matches password stored. Should only be called for users that are already created
- GET - /:username - Pass username parameter and get the user info. All usernames should be unique (Ensure in frontend)
- DELETE - /:username - Deletes user with matching name

### Post API
- POST - /create - Creates new post with given JSON, for new post pass in empty comments array
- GET - /search/message/:message - returns all posts that contain :message in their message contents
- GET - /search/name/:username - returns all posts made by a user
- GET - /search/all - returns all posts. Should only be called once to load homepage.
- GET - /search/comments/:id - returns all comments on a post with :id in the _id field
- DELETE - /delete/:id - deletes post with matching :id
- PUT - /edit/:id - Edits post with matching :id. Pass post message, _id, and comments. Can be used to edit a post or edit its comments (Done for quick dev, split into edit/comments and edit/message later).

## Backend todo
- If I add followers, add search/followed to only load followed account posts
- Split edit into editing for message and comments for better modularity
- Hash passwords before putting them in DB (Simple)

## Frontend todo
- Everything, not created yet
- Create home page
- Create account page
- Create signup, login, logout
- Have logic to prevent matching usernames