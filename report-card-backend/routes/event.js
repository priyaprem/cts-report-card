const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.post('/', (request, response, next) => {
    let event = request.body
    query = "insert into event (name, event_key) values (?, ?)"
    connection.query(query, [event.name, event.key], (err, result) => {
        if(!err){
            return response.status(200).json({"message": "Event added Successfully"})
        } else {
            return response.status(500).json(err);
        }
    })
})

router.get('/', (request, response, next) => {
    query = "select * from event";
    connection.query(query, (err, result) => {
        if(!err){
            return response.status(200).json(result);
        } else {
            return response.status(500).json(err)
        }
    })
})

router.patch('/:id/', (request, response, next) => {
    const id = request.params.id;
    let event = request.body;
    query = "update event set name = ?, event_key = ? where id = ?";
    connection.query(query, [event.name, event.key, id], (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Event id not found"})
            }
            return response.status(200).json({"message": "Event Updated Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})

router.delete('/:id/', (request, response, next) => {
    const id = request.params.id;
    query = "delete from event where id = ?";
    connection.query(query, [id], (err,result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Event id not found"})
            }
            return response.status(200).json({"message": "Event deleted Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})



module.exports = router;