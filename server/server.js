const express = require("express");
const { connectDB } = require("./config/connectDB");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000; // Ensure you have a fallback port

// Configure CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT,
//     credentials: true, // Allow cookies or other credentials
//   })
// );
app.use(cors({
  origin: 'https://opexpensetracker.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Explicitly handle preflight
app.options('*', cors());

// Middleware
app.use(express.json());
require('./middleware/prod')(app);

// Use the router for API routes
app.use("/api", router);

connectDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Listening on " + PORT);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db: " + err);
  });
