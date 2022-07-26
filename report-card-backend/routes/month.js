const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.post('/', (request, response, next) => {
    let month = request.body
    query = "insert into month (name, month_key) values (?, ?)"
    connection.query(query, [month.name, month.key], (err, result) => {
        if(!err){
            return response.status(200).json({"message": "Month added Successfully"})
        } else {
            return response.status(500).json(err);
        }
    })
})

router.get('/', (request, response, next) => {
    query = "select * from month";
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
    let month = request.body;
    query = "update month set name = ?, month_key = ? where id = ?";
    connection.query(query, [month.name, month.key, id], (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Month id not found"})
            }
            return response.status(200).json({"message": "Month Updated Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})

router.delete('/:id/', (request, response, next) => {
    const id = request.params.id;
    query = "delete from month where id = ?";
    connection.query(query, [id], (err,result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Month id not found"})
            }
            return response.status(200).json({"message": "Month deleted Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})



module.exports = router;