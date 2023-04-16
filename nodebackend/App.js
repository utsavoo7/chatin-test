const path = require("path");
const express = require("express");
const { json, static } = require("express");
const session = require("express-session");
const cors = require("cors");

const { dbConn } = require("./DB/DBUtils");

const {
  UsersRouter,
  JokeRouter,
  pointsRouter,
} = require("./Router/UsersRouter");

const app = express();

const whitelist = ["http://localhost:3001", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.use(static(path.join(__dirname, "public")));

app.use(json());

app.use(
  session({
    secret: "MYSECRETKEY",
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false },
  })
);

app.use("/api/auth", UsersRouter);
app.use("/api/league", pointsRouter);

app.use("/", (req, res, next) => {
  res.status(400).send("No such page found");
});

dbConn(() => {
  app.listen(5000, () => {
    console.log("Server started..");
  });
});
