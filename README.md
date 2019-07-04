# iSocial-MERN 
(In Progress)*
Social Application using MERN Stack

To access in Heroku : https://salty-forest-79452.herokuapp.com/

It utlizes the MERN stack to implement a social app where users 
1. Do Log-in,
2. Create Account,
3. Create Posts,
4. Like/Unlike Post
5. Comment on Post
6. List all developers
7. Show default image using Gravatar
8. Edit Profile
9. Delete Profile with Posts.

Adacnced Features:
1. Added Prerender.io to optimize the rendering of a JS page. With this, the site is cached after rendering and can be pulled up more quickly when accessed by a bot. The Prerender.io middleware that you install on your server will check each request to see if it's a request from a crawler. If it is a request from a crawler, the middleware will send a request to Prerender.io for the static HTML of that page. If not, the request will continue on to your normal server routes. The crawler never knows that you are using Prerender.io since the response always goes through your server.

2. Cache Implementation using REDIS.

3. Automated Headless Browser Testing.

The app is deployed in Heroku through Git. Please find the url above to access it.

Thanks.
