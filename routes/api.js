const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const router = express.Router();

router.use(bodyParser.json());

/*
Starting from here is the inital start for the DB changing Algorithm.
The configuration keys files are seperated by arrays.
*/
let dbConfig = require("../config/keys")[0];
let connection = mysql.createConnection(dbConfig);

router.get("/changeDB", (req, res) => {
  dbConfig = require("../config/keys")[1];
  if(dbConfig === require("../config/keys")[1]){
    res.send("sucess");
  } else {
    res.send("failure");
  }
});

router.get("/checkCurrDB", (req, res) => {
  res.send(dbConfig);
  console.log(dbConfig);
})
/*
End for the DB changing Algorithms.
*/

// Get all items from products
router.get("/getAll", (req, res) => {
  let query = "SELECT * FROM bookmarks;";
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err); //removing the return
    } else {
      return res.json({
        data: result.reverse()
      });
    }
  });
});

// Get all Listed Categories
router.get("/getCategoryList/:UserID", (req, res) => {
  let query = `SELECT * FROM bookmarktest.categorylist WHERE UserID = ${
    req.params.UserID
  };`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

// Get all BookmarkID of a CategoryID
router.get("/getCategoryBookmarks/:CatID", (req, res) => {
  let query = `SELECT BookmarkID FROM bookmarktest.categorybookmarks WHERE CategoryID = ${
    req.params.CatID
  };`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

// Get a Bookmark from a BookmarkID
router.get("/getBookmark/:BookmarkID", (req, res) => {
  let query = `SELECT * FROM bookmarktest.bookmarks WHERE BookmarkID = ${
    req.params.BookmarkID
  };`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

// Create Database
router.get("/createDB", (req, res) => {
  let query = "CREATE DATABASE products;";
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Database Created");
    }
  });
});

// Create Table
router.get("/createTable", (req, res) => {
  let query =
    "CREATE table products (id int NOT NULL AUTO_INCREMENT, name VARCHAR(50), cost int, PRIMARY KEY (id));";
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Table Created");
    }
  });
});

// Posting an Item
router.post("/post_bookmarks", (req, res) => {
  let newInsert = {
    BookmarkName: req.body.BookmarkName,
    URL: req.body.URL,
    BookmarkDescription: req.body.BookmarkDescription
  };
  console.log("There should be " + req.body.BookmarkDescription);
  let query = "INSERT INTO bookmarks SET ?";
  let output = connection.query(query, newInsert, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      res.send(newInsert);
    }
  });

  console.log("testing if code makes it to here");
});

router.delete("/delete/:BookmarkID", (req, res) => {
  let query = `DELETE FROM bookmarks WHERE BookmarkID = ${
    req.params.BookmarkID
  }`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.send("Delete has been made");
    }
  });
});

// Insert Item
router.get("/insert", (req, res) => {
  let item = {
    BookmarkName: "Yahoo",
    BookmarkDescription: "This links you to Yahoo",
    URL: "https://www.yahoo.com"
  };
  let query = "INSERT INTO bookmarks SET ?";
  let output = connection.query(query, item, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Insert has been made");
    }
  });
});

// Select Item
router.get("/select/:id", (req, res) => {
  let query = `SELECT * FROM products WHERE id = ${req.params.id}`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      let JSONOut = JSON.parse(JSON.stringify(result));
      console.log(JSONOut[0]);
      return res.send(
        "Selection has been made at " + JSON.stringify(JSONOut[0])
      );
    }
  });
});

// Update Item
router.get("/update/:id", (req, res) => {
  let update = 20;
  let query = `UPDATE products SET cost = ${update} WHERE id = ${
    req.params.id
  }`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.send("Update has been made");
    }
  });
});

/*
// Delete Item
router.get("/delete/:id", (req, res) => {
  let query = `DELETE FROM products WHERE id = ${req.params.id}`;
  let output = connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.send("Delete has been made");
    }
  });
});
*/

module.exports = router;
