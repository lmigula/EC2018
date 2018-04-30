
// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
var config = require('./config'); // get our config file
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const uuidv4 = require('uuid/v4');
var faker = require('faker');

let datastore = require('./database/dataStore');
let pdfTool = require('./pdfTool');

let fakeUser = require('./fakeUser');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 5050; // used to create, sign, and verify tokens
app.set('secretKey', config.secret); // secret variable

app.use(express.static('public')); //static content served from directory public

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================

// get an instance of the router for api routes
var apiRoutes = express.Router();
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Session. We got fun and games' });
});


apiRoutes.get('/invoices', function (req, res) {
  let resultList = [];
  datastore.getAllDocs()
    .then(data => {
      console.log('data', data);
      resultList = data;
      res.json(resultList);
    }, error => {
      console.error('error', error);
      res.json({
        resultList: resultList,
        error: error
      });
    });

});

apiRoutes.post('/invoices', function (req, res) {

  if (req.body) {
    let body = req.body;
    datastore.insert(body)
      .then(data => {
        console.log('data', data);
        res.json(data);
      }, error => {
        console.error('error', error);
        res.json({

          error: error
        });
      });
    // your JSON

  }
});

apiRoutes.patch('/invoices', function (req, res) {

  if (req.body) {
    let body = req.body;
    datastore.insert(body)
      .then(data => {
        console.log('data', data);
        res.json(data);
      }, error => {
        console.error('error', error);
        res.json({

          error: error
        });
      });
    // your JSON

  }
});

apiRoutes.get('/invoices/:id', function (req, res) {
  var id = req.params.id;
  if (id) {
    datastore.getInvoice(id)
      .then(data => {
        console.log('data', data);
        res.json(data);
      }, error => {
        console.error('error', error);
        res.json({

          error: error
        });
      });
    // your JSON
  }
});



apiRoutes.get('/invoicePdf/:id', function (req, res) {
  var id = req.params.id;
  if (id) {
    datastore.getInvoice(id)
      .then(data => {

        pdfTool.createPdf(data)
          .then(pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote-' + id + '.pdf');
            res.send(pdf);
          })

      }, error => {
        console.error('error', error);
        res.json({

          error: error
        });
      });
  }
});
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
  // find the user
  let user = {
    name: req.body.name,
    password: req.body.password,
    admin: false
  };
  const payload = {
    admin: user.admin
  };
  var token = jwt.sign(payload, app.get('secretKey'), {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });

  // return the information including token as JSON
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
});

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('secretKey'), function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
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
      message: 'No token provided.'
    });
  }
});

// route to return all users (GET http://localhost:5050/api/users)
apiRoutes.get('/users', function (req, res) {
  res.json({
    message: 'Welcome back',
    user: fakeUser.users
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

console.log('process.env.DBHOST:' + process.env.DBHOST);
let checkDB = function () {
  datastore.checkDatabaseExists('ec-invoice')
    .then(exists => {
      if (!exists) {
        console.log('create');
        datastore.createDatabase('ec-invoice')
          .then(function () {
            var designDoc = {
              "_id": "_design/list",
              "language": "javascript",
              "views": {
                "allDocs": {
                  "map": "function(doc) {\nemit(doc._id, doc);\n}"
                }
              }
            };
            datastore.insert(designDoc)
              .then(designData => {
                console.log('db created');
              });


          })
      } else {
        console.log('Datenbank existiert bereits.');
      }
    },
      err => {
        console.error('err: ' + JSON.stringify(err));
      }
    )
}


setTimeout(checkDB, 6500);

