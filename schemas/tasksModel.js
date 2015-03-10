/**
 * Created by wajihakanwal on 07/03/15.
 */

var mongoose = require("mongoose");
var dbConfigs = require("../dbConfig");

var Schema = mongoose.Schema;

exports.ToDoApp = exports.ToDoApp || {};
exports.ToDoApp.Model = exports.ToDoApp.Model || {};
exports.ToDoApp.Model.Tasks = exports.ToDoApp.Model.Tasks || {};
var ObjectId = mongoose.Schema.ObjectId;

var ActionDetails = {
    ActionTakenByName   : String,
    ActionTakenByID     : ObjectId,
    ActionTakenOn       : {type : Date, default : new Date()}
};

var TasksSchema = new Schema({
    Task            : String,
    CreationDetails : ActionDetails,
    Status          : Boolean            /* 0 : Pending, 1 : Done */
});

exports.ToDoApp.Model.Tasks.getTasksModel = dbConfigs.dbcon.model('tasks', TasksSchema);