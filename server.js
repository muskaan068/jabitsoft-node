//Import packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
require("dotenv").config();
// Router Implemented as per each route
const authRouter = require("./routes/auth.route");
const blogsRouter = require("./routes/blogs.route");
const dashboardRouter = require("./routes/dashboard.route");
const portfolioRouter = require("./routes/portfolio.route");
const portfolioUploadRouter = require("./routes/portfolio-img-upload.route");
const contactRouter = require("./routes/contact.route");
//File upload package
const PORT = 9000 || process.env.PORT;
const app = express();
//handle the cors origin
app.use(cors());
//Serve as the public directory
app.use(express.static("public"));
// access to upload files
app.use("/uploads", express.static("public"));
app.use(fileupload());
app.use(bodyParser.json({ limit: "50mb" }));
// Middleware for request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Default Route
app.get("/", (req, res) => {
  res.send({ message: "welcome to jabitsoft api" });
});
// Route handling
app.use("/api", authRouter);
app.use("/api", blogsRouter);
app.use("/api", dashboardRouter);
app.use("/api", portfolioRouter);
app.use("/api", portfolioUploadRouter);
app.use("/api", contactRouter);

// Catch all routes while throw error
app.all("*", (req, res) => {
  const error = new Error(`Requested url ${req.path} not found`);
  res.status(400).send({
    success: 0,
    status: 400,
    message: error.message,
  });
});
//Server Entrypoint
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
