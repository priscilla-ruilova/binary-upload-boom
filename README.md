# Starter Social Media App

A starter full-stack social media app where users can sign up, share photo posts, like each other's posts, and comment on them. Built with Node.js, Express, MongoDB, and EJS, with images stored on Cloudinary.

### Project Description

This project is a starter social media application. It gives users a complete account flow (sign up, log in, log out), a feed of posts from everyone on the site, a personal profile page showing only their own posts, and the ability to create, like, and delete posts with an uploaded image. Each post has its own page where comments can be added. It was built as a learning project, forked from [100devs/binary-upload-boom](https://github.com/100devs/binary-upload-boom) to practice server-side rendering, authentication, database models, and file uploads.

### Live Link: [Click here!](https://starter-social-media-app-3.onrender.com/)
  - The link is also in the About section of this repo to the right.

![screenshot of profile page](public/imgs/profile.png)
![screenshot of individual post](/public/imgs/individual-post.png)
![screenshot of post feed](/public/imgs/post-feed.png)

### Features:

* **User authentication** — sign up and log in with email and password. Passwords are hashed with bcrypt and sessions are handled with Passport and stored in MongoDB.
* **Protected routes** — the feed, profile, and individual posts are only visible when logged in.
* **Create posts** — upload an image with a title and caption. The image is sent to Cloudinary and the returned URL is saved to the post.
* **Feed** — shows every post, newest first.
* **Profile page** — shows only the logged-in user's own posts.
* **Likes** — like a post from its page and the like count goes up.
* **Comments** — add a comment on any post page.
* **Delete posts** — removes the post from the database *and* deletes the image from Cloudinary so orphaned files don't pile up.
* **Flash messages** — error and info messages shown to the user via express-flash.

### Tech Used:

* **Frontend:** HTML, CSS, EJS (templating), Bootstrap, JavaScript
* **Backend:** Node.js, Express
* **Database:** MongoDB with Mongoose
* **Auth:** Passport (local strategy), bcrypt, express-session, connect-mongo
* **File uploads:** Multer, Cloudinary
* **Other:** dotenv, method-override, morgan, express-flash, nodemon

### Things I Learned:

* File Architecture:
  - Structuring an app into separate folders for routes, controllers, models, middleware, views, and config, instead of putting everything in one file. 
* Using middleware: 
  - Making sure `upload.single("file")` runs with Multer before the controller, and `ensureAuth` can be dropped onto any route to protect it.
  - How to set up authentication with Passport and a local strategy, and how sessions get stored in MongoDB so users stay logged in.
* Backend data management tools:
  - Mongoose:
    - How to query the database with Mongoose — `find()`, `findById()`, `findOneAndUpdate()` with `$inc` for likes, and sorting posts by `createdAt` in descending order.
  - Cloudinary:
    - How to upload files to Cloudinary.
    - Why it matters to delete the Cloudinary image when a post is deleted, not just the database record.
* How to use `method-override` so HTML forms can send PUT and DELETE requests.

### How to Use:
1. Clone this repository or the one I forked from above:
   ```bash
   git clone https://github.com/priscilla-ruilova/starter-social-media-app.git
   ```

2. Navigate to the project:
   ```bash
   cd starter-social-media-app
   ```

3. Install dependencies: 
  ```bash
  npm install
  ```

4. Create a `.env` file in config folder and add the following as `key = value`; no quotes needed!:
  ```bash
  - PORT = 3000 or can be any port 
  - DB_STRING = your database URI
  - CLOUD_NAME = your cloudinary cloud name
  - API_KEY = your cloudinary api key
  - API_SECRET = your cloudinary api secret
   ```

5. Run the app!
  ```bash 
  npm start
  
6. Make it your own!
  - Consider changing the styling by removing bootstrap, using a different framework, or writing your own CSS. 