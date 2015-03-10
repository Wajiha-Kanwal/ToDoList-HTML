/**
 * Created by wajihakanwal on 08/03/15.
 */

var TasksModelLib  = require("../schemas/tasksModel").ToDoApp.Model.Tasks;
var TasksModel     = TasksModelLib.getTasksModel;
var mongoose = require('mongoose');
var q = require('q');

exports.ToDoApp = exports.ToDoApp || {};
exports.ToDoApp.Repository = exports.ToDoApp.Repository || {};
exports.ToDoApp.Repository.Tasks = exports.ToDoApp.Repository.Tasks || {};

exports.ToDoApp.Repository.Tasks.saveNewTask = function(modelData){
    var deferred = q.defer();
    var newModel = new TasksModel(modelData);
    newModel.save(function(err, doc){
        if(err){
            console.log("error in saving at saveNewTask");
            console.log(err);
            deferred.reject({status: false, message: 'Failed to save', obj :err});
        }
        else{

            console.log("Successfully saved at saveNewTask");
            deferred.resolve({status: true, message: "Saved successfully", obj : doc});
        }
    });
    return deferred.promise;
};

exports.ToDoApp.Repository.Tasks.getTasks = function(isSingle, query, selectFields, sortParams){
    var deferred = q.defer();
    if(isSingle){
        TasksModel.findOne(query)
            .select(selectFields)
            .exec(function(err , docs){
                if(err){
                    deferred.reject({status: false, message:"Error in finding previous saved docs", obj : err});
                }
                else{
                    deferred.resolve({status: true, message:"Found Successfully", obj : docs})
                }
            });
    }
    else{
        TasksModel.find(query)
            .sort(sortParams || '')
            .select(selectFields)
            .exec(function(err , docs){
                if(err){
                    deferred.reject({status: false, message:"Error in finding previous saved docs", obj : null});
                }
                else{
                    deferred.resolve({status: true, message:"Found Successfully", obj : docs})
                }
            });
    }
    return deferred.promise;
};

exports.ToDoApp.Repository.Tasks.updateTask= function(queryParams, updateParams, multi){
    var deferred = q.defer();
    TasksModel.update(queryParams, updateParams, multi, function(err, effectedDocsCount){
        if(err){
            console.log("Error in Updating service in DB");
            console.log(err);
            deferred.reject({status:false , message : "DB Error, Failed to Update Service in DB", errObj : err});
        } else {
            deferred.resolve({status: true, counts : effectedDocsCount, message : "Update Successfully"});
        }
    });
    return deferred.promise;
};

exports.ToDoApp.Repository.Tasks.removeTask= function(queryParams){
    var deferred = q.defer();
    TasksModel.remove(queryParams, function(err, effectedDocsCount){
        if(err){
            console.log("Error in Updating service in DB");
            console.log(err);
            deferred.reject({status:false , message : "DB Error, Failed to Update Service in DB", errObj : err});
        } else {
            deferred.resolve({status: true, counts : effectedDocsCount, message : "Removed Successfully"});
        }
    });
    return deferred.promise;
};