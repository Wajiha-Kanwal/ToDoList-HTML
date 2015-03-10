/**
 * Created by wajihakanwal on 07/03/15.
 */

var q           = require('q');
var async       = require("async");

var TasksLib    = require('../repositories/tasksRepository').ToDoApp.Repository.Tasks;

exports.ToDoApp = exports.ToDoApp || {};
exports.ToDoApp.Controller = exports.ToDoApp.Controller || {};
exports.ToDoApp.Controller.Tasks = exports.ToDoApp.Controller.Tasks || {};

exports.ToDoApp.Controller.Tasks.renderTasksListPage = function(req, res, next) {
    TasksLib.getTasks(false, {}, false, "-CreationDetails.ActionTakenOn").then(function(data){{
        console.log("data");
        console.log(data.obj.length);
        res.render('toDoList', { title: 'To Do List', tasks : JSON.stringify(data.obj) });
    }}, function(err){
        res.send({status : false});
    });
};

exports.ToDoApp.Controller.Tasks.addTask = function(req, res, next) {
    console.log("Received task");
    console.log(req.body);
    var obj = {Task : req.body.Task, Status : 0};
    TasksLib.saveNewTask(obj).then(function(data){{
        res.send({status : true, savedTask : data.obj});
    }}, function(err){
        res.send({status : false});
    });
};

exports.ToDoApp.Controller.Tasks.updateTask = function(req, res, next) {
    var bodyObj = req.body;
    var query = {_id : bodyObj._id};
    var update = {"$set" :  {Status : 1 }};

    TasksLib.updateTask(query, update).then(function(data){{
        res.send({status : true});
    }}, function(err){
        res.send({status : false});
    });
};

exports.ToDoApp.Controller.Tasks.removeTask = function(req, res, next) {
    var bodyObj = req.body;
    var query = {_id : bodyObj._id};

    TasksLib.removeTask(query).then(function(data){{
        res.send({status : true});
    }}, function(err){
        res.send({status : false});
    });
};