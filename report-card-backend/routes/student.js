const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.post('/', (request, response, next) => {
    let student = request.body
    query = "insert into student (name, role) values (?,?)"
    connection.query(query, [student.name, student.role], (err, result) => {
        if(!err){
            return response.status(200).json({"message": "Student added Successfully"})
        } else {
            return response.status(500).json(err);
        }
    })
})

router.get('/', (request, response, next) => {
    query = "select * from student";
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
    let student = request.body;
    query = "update student set name = ?, role = ? where id = ?";
    connection.query(query, [student.name, student.role, id], (err, result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Student id not found"})
            }
            return response.status(200).json({"message": "Student Updated Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})

router.delete('/:id/', (request, response, next) => {
    const id = request.params.id;
    query = "delete from student where id = ?";
    connection.query(query, [id], (err,result) => {
        if(!err){
            if(result.affectedRows == 0){
                return response.status(404).json({"message": "Student id not found"})
            }
            return response.status(200).json({"message": "Student deleted Successfully"})
        } else {
            return response.status(500).json(err)
        }
    })
})



module.exports = router;