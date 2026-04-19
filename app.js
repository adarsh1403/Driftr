// require express package
const express = require("express");

// create express application object ( calls the express function that returns an app instance and stores app instance in app)
const app = express();

// require mongoose package
const mongoose = require("mongoose");



// require node.js built-in path module.
// It helps build safe, cross-platform file paths (Windows and Linux/Mac use different separators).
const path = require("path");

// require method-override package for using put/patch/delete request in html forms
const methodOverride = require("method-override");

// require ejs-mate package for easy sub-templating 
const ejsMate = require("ejs-mate");

// define my mongodb database name and url
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// require custom error class 
const ExpressError = require("./utils/ExpressError.js");

// require listing routes
const listingRoutes = require("./routes/listing.js");

// require review routes
const reviewRoutes = require("./routes/review.js");

// connecting to database  in asynchronous manner and defining the afterwork
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// function to connect to database 
async function main() {
  await mongoose.connect(MONGO_URL);
}

// setting template engine to ejs so that express knows how to process ejs files in res.render()
app.set("view engine", "ejs");

// whenever we render a file express looks for views folder in the directory where server is started. so by this we join views of express to the absolute path which is the current file's directory given by __dirname
// Use the current file’s directory so Express can find views reliably no matter where the app is started.
app.set("views", path.join(__dirname, "views"));

// middleware-> parses req.body when its sent in form-urlencoded format
// It parses HTML form data into req.body, including nested fields like listing[title].
app.use(express.urlencoded({ extended: true }));

// middleware-> take the query string with _method key and uses its value to convert into actual request type.
app.use(methodOverride("_method"));

// app.set("view engine", "ejs") says which template type to use. and app.engine("ejs", ejsMate) says which renderer implementation should process that type.
// registers ejs-mate as the rendering engine for EJS files.
app.engine("ejs", ejsMate);

// middleware-> tells the express to serve static files (css,js,images,etc.) from current directory's public folder.
app.use(express.static(path.join(__dirname, "public")));

// root route for app
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// using listing routes for all routes starting with /listings 
app.use("/listings", listingRoutes);

// using review routes for all routes starting with /listings/:id/reviews
app.use("/listings/:id/reviews", reviewRoutes);


// universal (wildcard) route for catching unmatched routes
// *splat -> modern express way of saying match any path
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// middleware-> custom error handling rather than default express error
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// server opened on port 8080 for listening 
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
