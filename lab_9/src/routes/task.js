let express = require('express')
let router = express.Router()
let db = require('../database');

// Create a new task
// POST localhost:<port>/task
router.post('/task', (req, res) => {
    // now we have access to req.body due to body-parser (see index.js)
    if (!req.body) {
        return resizeBy.status(400).send('Request body is missing')
    }

    let task = {
        name: req.body.taskName,
        dueDate: req.body.taskDueDate // Example 2020-11-24
    }
    
    var sql ='INSERT INTO tasklist (taskName, dueDate) VALUES (?,?)'
    var params =[task.name, task.dueDate]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": task,
            "id" : this.lastID
        })
    });
    
})

//GET
router.get('/task', (req, res) => {
    if (!req.query) {
        return res.status(400).send('Missing URL parameter id')
    }
    let sql = "select * from tasklist where id = ?"
    console.log("req.query.taskId: " + req.query)
    let params = [req.query.taskId]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})

//Update
router.put('/task', (req, res) => {
    console.log("PUT called")
    var data = {
        id : req.query.taskId,
        taskName: req.body.taskName    
    }

    console.log("data.id:" + data.id + " name:" + data.taskName)
    if (!data.id) {
        return res.status(400).send('Missing URL parameter id')
    }
    db.run(
        `UPDATE tasklist set 
           taskName = ? 
           WHERE id = ?`,
        [data.taskName, data.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

//Delete
router.delete('/task', (req, res) => {
    console.log("DELETE called")
    var data = {
        id : req.query.taskId   
    }
    console.log("data.id:" + data.id)
    if (!data.id) {
        return res.status(400).send('Missing URL parameter id')
    }

    var sql ='DELETE FROM tasklist WHERE id = ?'
    var params =[data.id]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "successully deleted",
        })
    });
})


module.exports = router