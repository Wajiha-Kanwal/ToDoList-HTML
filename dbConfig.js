/**
 * Created by wajihakanwal on 07/03/15.
 */

var mongoose    = require('mongoose');
var dburl       = 'mongodb://wajiha:wajiha@ds033639.mongolab.com:33639/todolist-html';

exports.connectionString = dburl;
exports.dbcon = exports.dbcon || mongoose.connect(dburl, function(err, db){
    if(err){
        console.log("Can not connect to DB");
        console.log(err);
    }
    else
    {
        console.log("Connected to DB");
    }
});

exports.conn = exports.dbcon;