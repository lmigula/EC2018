// =======================
// get the packages we need ============
// =======================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var config = require("./config"); // get our config file
var morgan = require("morgan");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var users = require("./fakeUser.js");
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 5050; // used to create, sign, and verify tokens
app.set("secretKey", config.secret); // secret variable

app.use(express.static("public")); //static content served from directory public

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan("dev"));

// =======================
// routes ================
// =======================

// get an instance of the router for api routes
var apiRoutes = express.Router();
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get("/", function(req, res) {
  res.json({ message: "Welcome to the coolest API on earth!" });
});
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post("/authenticate", function(req, res) {
  // find the user
  var user = users.validateUser(req.body.username, req.body.password);
  if (user) {
    const payload = {
      admin: user.admin
    };
    var token = jwt.sign(payload, app.get("secretKey"), {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      user: user,
      message: "Enjoy your token!",
      token: token
    });
  } else {
    res.json({
      success: false,
      message: "Falscher Login"
    });
  }
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("secretKey"), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

// route to return all users (GET http://localhost:5050/api/users)
apiRoutes.get("/users", function(req, res) {
  res.json({
    message: "Welcome back"
  });
});

// apply the routes to our application with the prefix /api
app.use("/api", apiRoutes);

app.listen(port);
console.log("Magic happens at http://localhost:" + port);
