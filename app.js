import express, { json } from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import tuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
const MONGOURI =
  process.env.MONGOURI || "mongodb://127.0.0.1:27017/tuiter";
mongoose.connect(MONGOURI);

const app = express();
const PORT = 4000;
// Middleware
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: "https://tangerine-tanuki-827f92.netlify.app",
    // origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(json());
app.use(morgan("short"))
// app.use(
//   session({
//     secret: "string",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );

HelloController(app);
UserController(app);
tuitsController(app);
AuthController(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});