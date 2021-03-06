/**
 * Created by ahmed on 13/03/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API Root!');
});

//GET /todos
app.get('/todos', function (req, res) {
    var query = req.query;
    var where={};

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = false;
    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if (query.hasOwnProperty('q') && query.q.length > 0) {
       where.description = {
           $like: '%'+ query.q +'%'
       };
    }

db.todo.findAll({where: where}).then(function (todos) {
    res.json(todos);
},function (e) {
    res.status(500).send();
})



/*    var filterdTodos = todos;

    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        filterdTodos = _.where(filterdTodos, {completed: true});
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filterdTodos = _.where(filterdTodos, {completed: false});
    }

    if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
        filterdTodos = _.filter(filterdTodos, function (todo) {
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }

    res.json(filterdTodos);*/
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
  /*  var matchedTodo = _.findWhere(todos, {id: todoId});
    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }*/

  db.todo.findById(todoId).then(function (todo) {
      if(!todo){
          res.json(todo.toJSON());
      }else{
          res.status(404).send();
      }
  },function (e) {
      res.status(500);
  });
  
    //  res.send('Asking for todo with id of '+ req.params.id);
});


//POST  /todos/:id
app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');//use _.pick to only pick description znd completed

    db.todo.create(body).then(function (todo) {
        res.json(todo.toJSON)
    },function (e) {
        res.status(400).json(e);
    });

/*    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    //set body.description to be trimmed value
    body.description = body.description.trim();

    //add id field
    body.id = todoNextId;
    todoNextId++;

//add id field
//push body into array
    todos.push(body);
    console.log('description : ' + body.description);
    res.json(body);*/
});

//ELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    if (!matchedTodo) {
        res.status(404).json({"error": "no todo found with that id"});
    } else {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
});

//PUT  /todos/:id
app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');//use _.pick to only pick description znd completed
    var validAttributes = {};


    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim()) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log('Express listening on port ' + PORT + ' !');
    });
});

/*app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + ' !');
});*/


/*
 {
 id:1,
 description: 'Meet nom for lunch',
 completed: false
 },{
 id:2,
 description: 'Go to market',
 completed: false
 },{
 id:3,
 description: 'Feed the cat',
 completed: true
 }
 */








/*
 {
 id:1,
 description: 'Meet nom for lunch',
 completed: false
 },{
 id:2,
 description: 'Go to market',
 completed: false
 },{
 id:3,
 description: 'Feed the cat',
 completed: true
 }
 */










