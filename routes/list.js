/**
 * Created by wajihakanwal on 06/03/15.
 */

var express = require('express');
var tasksController = require('../controllers/tasksController').ToDoApp.Controller.Tasks;
var router  = express.Router();

/* GET List page. */
router.get ('/'             , tasksController.renderTasksListPage);
router.post('/addTask'      , tasksController.addTask);
router.post('/updateTask'   , tasksController.updateTask);
router.post('/removeTask'   , tasksController.removeTask);

module.exports = router;
