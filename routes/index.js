var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todolist', function(req, res) {
  var db = req.db;
  var collection = db.get('tasks');
  collection.find({}, {}, function(e,docs){
    res.render('todolist', {
      "todolist" : docs
    });
  });
});

router.get('/newtask', function(req, res) {
  res.render('newtask', {title: 'Add New Task' });
});

router.post('/addtask', function(req, res) {
  var db = req.db;

  var taskName = req.body.taskname;

  var collection = db.get('tasks');

  collection.insert({
    "taskname" : taskName
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      res.redirect("todolist");
    }
  });
});

router.get('/removetask', function(req,res) {
  res.render('removetask', {title: 'Remove a Task'});
});

router.post('/deletetask', function(req, res) {
  var mongodb = require('mongodb')
  var db = req.db;
  var taskName = req.body.taskname;
  var collection = db.get('tasks');

  collection.remove({
    "taskname" : taskName
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem removing the information from the database");
    }
    else {
      res.redirect("todolist");
    }
  });
});

module.exports = router;
