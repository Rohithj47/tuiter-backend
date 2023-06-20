import express, { json } from 'express';
import session from 'express-session';
import cors from 'cors'
import HelloController from './controllers/hello-controller.js';
import UserController from './users/users-controller.js';
import tuitsController from './controllers/tuits/tuits-controller.js';
import AuthController from './users/auth-controller.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';



const app = express();
const PORT = 4000;


mongoose.connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`Not connected to DB - ${err}`)
  });

// Middleware
app.use(
  cors()
)
app.use(json());
app.use(
  session({
    secret: "string",
    resave: false,
    saveUninitialized: true
  })
)
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000"
//   })
// )
app.use(morgan("short"))

HelloController(app)
UserController(app)
tuitsController(app)
AuthController(app)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});