# EXPENSE TRACKER
#### Video Demo : https://youtu.be/2BW_g3Tz-SM
#### Live Project : https://opexpensetracker.netlify.app/
## Description:

### How to run this project on localhost?

1. First download the Expense Tracker folder
Use `npm install` in both client and server folder
    to install all the node modules

2. In the server folder create a .env file and define these

`PORT=1234`

`DB=<Your MongoDB link>`

`CLIENT=http://localhost:3000`

`JWTPRIVATEKEY=<Your jwt_Private_key>`

3. `npm start` both client and server

### What is this project about?

This is a simple monthly expense tracking web application with some data analysis

### How does this project work?

This project is divided into two sections, client side (Frontend) and server side (Backend)

#### Client Side:

Client side uses the React framework to render the frontend and adds reactivity into it.

React is pretty easy to learn check out their docs to get started: https://react.dev/learn

Now let us analysis all the client side folders

1. /public/index.html: This is the only html file in the entire project and if client side javascript is enabled , all the react renders would be rendered in the `<div id ="root"></div>`

2. /src/components/: This contains all the react components that we want to reuse multiple times in the project, Like the `AuthNav.jsx` renders a navbar for the case when client is logged out, we use that while rendering `Login.jsx` and `Register.jsx` , when the user is logged in we use `Navbar.jsx`, we use this while rendering four files (`Dashboard.jsx`, `Statistics.jsx`,`Settings.jsx`,`Transaction.jsx`), similarly `Error.jsx` is the component used to render a string of message that is received from the backend. `ProtectedRoute.jsx` is used to protect the routes that requires login , main render is passed as a child of this component, that is until this components is not render the child components wont.

3. /src/helpers/: this contains a file `helperFnx.js` which is the act as a link between the frontend and the backend. It uses a npm module called `axios` , which is capable of sending CRUD requests just like we do in postman. Function names are self explanatory and axios just send the require payload accordingly.

4. /src/images/: stores all the images of the project

5. /src/models/: these contain the files that can render models (here charts). `Line-chart.jsx` renders a graph is x-y axis , this is used in `Statistics.jsx`. `Pie-chart.jsx` renders a Pie-chart, this is used in `Dashboard.jsx`. Both of these use react npm modules to render the models.

6. /src/pages/: these are all the pages the client can access through frontend. `Login.jsx` makes use of react's useEffect hook to check if user has clicked remember me or not (that is if xAuthToken is in the Browser Storage or not). `NoPage.jsx` redirects the user if trying to access a page that doesn't exists. `Register.jsx` gets data from user and sends it to the backend via axios, process to the login page via `useNavigate` if successful else renders the `Error.jsx` component. The `handleSubmit` and `handleChange` functions are directly implemented from the react docs and I recommend to refer the docs to know more about them in depth. `Settings.jsx` gives the user the ability to logout, clear user data and delete user from the database. `Statistics.jsx` file fetches the Transaction data from the database and converted it into a line-chart for analysis using the `Line-chart.jsx` model.`Transaction.jsx` gives the client ability to add new Transaction in the data while also displaying their pervious Transaction records. `Dashboard.jsx` this page renders the clients Current Balance , Total Income , Total Expense based on the clients Transaction history; it also renders a pie-chart and some analysis based on above mentioned three factors. `Layout.jsx` is the starting page of this application.

7. src/routes/index.js: This creates a router and assigns element to be rendered for a particular url path.

8. src/index.css: index.scss is converted to index.css using the vscode extension `Live Sass Compiler`, refer to this bootstrap docs for more info : https://getbootstrap.com/docs/5.3/customize/sass/

9. src/index.js : this where the react execution starts, we set root render position here, and then set up path to other routes too. We also use React in Strict mode for surface level debugging (mentioned in the docs).

10. Basic structure summarized
```
// Before Login
<APP>
    <NAV>
        LOGIN
        REGISTER
    </NAV>
    <ROOT>
        CONTENT
    </ROOT>
</APP>
```
```
// After Login
<APP>
    <PROTECT>
        <NAV>
            DASHBOARD
            STATISTICS
            TRANSACTION
            SETTINGS
        </NAV>
        <ROOT>
            CONTENT
        </ROOT>
    <PROTECT>
</APP>
```


#### Server Side:

1. config/connectDB.js: This file returns a async function that tries to connects to the MongoDB database using the mongoose module.

2. /controllers/: this folder contains all the files that returns a async function to control the database or interact with the database.

3. /middleware/: this folder contains user defined middleware functions that used in the request -> response pipeline. `auth.js` middleware restricts requests made by clients with null or invalid authorization. `prod.js` is a production level middleware that adds extra safety from bad requests.

4. /models/: this folder contains schema for all the database models . `users.js` defines the structure in which a user would be stored in the database same applies for `finance.js` and `transaction.js`, import point to note here is that this database uses a reference based approach to store and link data.

5. /routes/index.js: This file sets up an express router to handle various API endpoints related to user authentication and data management. It defines routes for registering, logging in, and verifying users, as well as for handling financial and transaction data, adding, clearing, and deleting user data, with authentication middleware applied where needed. The router is then exported for use in the main application.

6. /server.js: This file sets up an express app with configuration for connecting to a database, handling CORS, and applying middleware. It tries to initializes the server, listens on a specified port, and uses a router to manage API routes. It also tries connects to a database using the function exported from `connectDB.js` and logs connection status or errors.

### How is this project hosted on the web?

To host this project on the web I hosted frontend and backend on 2 different platforms,

#### Client Side Hosting:

To host a react project first you need to convert it into a production build

You can do that by using `npm run build` this will generate a build folder ready for production use.

You can directly deploy that folder on a platform called Netlify

#### Server Side Hosting:

There are various ways to host a backend project

Here I am only going to discuss the one that I used for this project

I used a platform called back4app that lets you deploy your backend server for free.

1. First add a docker file as mentioned by the back4app docs
here is the one that I created for this project.

```
# Use Node.js v20
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 1234

CMD [ "node", "server.js" ]
````
2. create a .gitignore file

```
.env
node_modules/
```

3. push this server folder into your GitHub repository

4. Connect this repository to back4app when creating a Container as a Service app and configure the settings accordingly

5. Set the environment variables like you did in the .env file.

6. Deploy your backend Server!



# This was CS50
