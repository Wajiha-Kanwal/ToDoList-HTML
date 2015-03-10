/**
 * Created by wajihakanwal on 10/03/15.
 */

$(function(){
    if(tasks.length){
        tasks.forEach(function(elem){
            $('#taskList').append(returnTaskHTML(elem));
        });
    }
    $('#submitTask').on('click', function () {
        var $btn = $(this).button('loading');
        var newTask = $('#task').val();
        if(!newTask){
            showMessage('!', ' Missing required data', '#msgArea');
            $btn.button('reset');
            return;
        }
        $.ajax({
            url : '/list/addTask',
            type : 'post',
            data : {Task : newTask},
            success : function(obj){
                tasks.push(obj.savedTask);
                $('#taskList').append(returnTaskHTML(obj.savedTask));
                showMessage('Success', 'Saved Task', '#msgArea', 'info')
            },
            error : function(err){
                showMessage('Error' , 'Some error occurred', '#msgArea')
            },
            complete : function(){
                $('#task').val('').focus();
                $btn.button('reset');
            }
        });
    });

    $(document).on('click', '.done', function () {
        var self    = $(this);
        var $btn    = self.button('loading');
        var taskID  = self.attr('data-id');
        if(!taskID){
            showMessage('!', ' Unable to get task ID', '#msgArea');
            $btn.button('reset');
            return;
        }
        $.ajax({
            url : '/list/updateTask',
            type : 'post',
            data : {_id : taskID},
            success : function(obj){
                showMessage('Success', 'Updated Task', '#msgArea', 'info');
                $('div.row[data-id="'+taskID+'"] .taskItem').html('<s>' + $('div.row[data-id="'+taskID+'"] .taskItem').html() + '</s>');
            },
            error : function(err){
                showMessage('Error' , 'Some error occurred', '#msgArea')
            },
            complete : function(){
                $btn.button('reset');
                self.attr('disabled', 'disabled');
            }
        });
    });

    $(document).on('click', '.delete', function () {
        var self    = $(this);
        var $btn    = self.button('loading');
        var taskID  = self.attr('data-id');
        if(!taskID){
            showMessage('!', ' Unable to get task ID', '#msgArea');
            $btn.button('reset');
            return;
        }
        $.ajax({
            url : '/list/removeTask',
            type : 'post',
            data : {_id : taskID},
            success : function(obj){
                showMessage('Success', 'Removed Task', '#msgArea', 'info');
                $('a.list-group-item[data-id="'+taskID+'"]').remove();
            },
            error : function(err){
                showMessage('Error' , 'Some error occurred', '#msgArea')
            },
            complete : function(){
            }
        });
    });
});

function returnTaskHTML(task){
    var disabled = task.Status ? 'disabled="disabled"' : '';
    var taskItem = task.Status ? ('<s>' +task.Task+ '</s>') : task.Task;
    return '<a href="#" data-id="'+task._id+'" class="list-group-item">'+
                '<div data-id="'+task._id+'" class="row">' +
                    '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">' +
                        '<span class="text-left text-center taskItem">' + taskItem + ' </span>' +
                    '</div>' +
                    '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
                        '<div class="btn-group" role="group" aria-label="...">'+
                            '<button data-id="'+task._id+'" type="button" class="btn btn-primary done" aria-label="Left Align" ' + disabled +'>'+
                                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+
                            '</button>'+
                            '<button data-id="'+task._id+'" type="button" class="btn btn-primary delete" aria-label="Left Align">'+
                                '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'+
                            '</button>'+
                        '</div>'+
                    '</div>' +
                '</div>' +
            '</a>';
}

function showMessage(strongTxt, txt, targetContainer, alertType){
    var html =
        '<div class="alert alert-' + (alertType || 'danger') +' alert-dismissable">' +
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
        '<strong>'+strongTxt+'</strong> ' + txt +
        '</div>'
    $(targetContainer).html(html);
}