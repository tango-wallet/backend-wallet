const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { User } = require("./models");
const { userRoutes } = require("./routes");

dotenv.config();
const app = express();
const server = require("http").Server(app);

app.disable("x-powered-by");

//CORSR
const corsOptions = {
  origin: [process.env.PROD_URL, process.env.LOCAL_HOST],
  optionsSuccessStatus: 204,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json());

connectDB(
  `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(
    process.env.MONGO_PSW
  )}@${process.env.MONGO_URI}`
);

//mongodb+srv://almendra:RoTJABAXUDr9tWDr@tangowallet.kmivdcg.mongodb.net/tangowallet?retryWrites=true&w=majority
const PORT = process.env.PORT;

app.use(function (req, res, next) {
  req.endpoint = req.originalUrl.split("/")[2];
  req.method = req.method;
  switch (req.endpoint) {
    case "users":
      req.Model = User;
      break;
  }

  next();
});

//Routes
app.get("/", (req, res) => {
  res.send("Api running....");
});

app.use("/user", userRoutes);

//Listen
server.listen(PORT, () => console.log("Server started on port " + PORT));
