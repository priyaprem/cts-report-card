const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.post('/', (request, response, next) => {
    let college = request.body
    query = "insert into college (name, college_key) values (?,?)"
    connection.query(query, [college.name, college.key], (err, result) => {
        if(!err){
            return response.status(200).json({"message": "College added Successfully"})
        } else {
            return response.status(500).json(err);
        }
    })
})

router.get('/', (request, response, next) => {
    query = "select * from college";
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
    let college = request.body;
    query = "update college set name = ?, college_key = ? where id = ?";
    connection.query(query, [college.name, college.key, id], (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "College id not found"})
            }
            return response.status(200).json({"message": "College Updated Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})

router.delete('/:id/', (request, response, next) => {
    const id = request.params.id;
    query = "delete from college where id = ?";
    connection.query(query, [id], (err,result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "College id not found"})
            }
            return response.status(200).json({"message": "College deleted Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})



module.exports = router;