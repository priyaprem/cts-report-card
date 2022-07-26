const { query } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

let event_detail_id = null

function checkIfEvenDetailExists(college_month_event_id, callback) {
    const event_detail_query = "select id from event_detail where college_month_event_id = ?"
    const value = connection.query(event_detail_query, [college_month_event_id], function (err, result) {
        if (err)
            throw err
        return callback(result[0] ? result[0].id : null)
    })
}

const deleteEventStars = (college_month_event_id, response, request) => {
    console.log("in delete stars")
    const delete_event_star_query = "update event_star set status = 500 where college_month_event_id = ?"
    connection.query(delete_event_star_query, [college_month_event_id], (err, result) => {
        if (err) {
            throw err
        }
    })
}

const insertEventStars = (event_stars, response, request) => {
    console.log("in insert stars")

    const event_star_insert_query = "INSERT INTO event_star (college_month_event_id, student_id, type) VALUES ?";
    connection.query(event_star_insert_query, [event_stars], function (err, result) {
        if (err) {
            throw err
        }
    });
}

const updateEventDetail = (event, id, request, response) => {
    console.log("in update")
    update_query = "update event_detail set college_month_event_id = ?, event_name = ?, objective = ?, description = ?, date = ?, place = ?, mode = ? where id = ?";
    connection.query(update_query, [event.college_month_event_id, event.event_name, event.objective, event.description, event.date, event.place, event.mode, id], (err, result) => {
        if (!err) {
            try {
                deleteEventStars(event.college_month_event_id, response, request)
                insertEventStars(event.event_stars, response, request)
            } catch (e) {
                throw err
            }
        } else {
            throw err
        }
    })
}

const insertEventDetail = (event, request, response) => {
    console.log("in update")
    insert_query = "insert into event_detail (college_month_event_id, event_name , objective , description , date , place , mode) values (?,?,?,?,?,?,?)";
    connection.query(insert_query, [event.college_month_event_id, event.event_name, event.objective, event.description, event.date, event.place, event.mode], (err, result) => {
        if (!err) {
            try {
                deleteEventStars(event.college_month_event_id, response, request)
                insertEventStars(event.event_stars, response, request)
            } catch (e) {
                throw err
            }
        } else {
            throw err
        }
    })
}

router.post('/', (request, response, next) => {
    let event = request.body
    checkIfEvenDetailExists(event.college_month_event_id, function (result) {
        college_month_event_id = result
        console.log("sample", college_month_event_id)
        if (college_month_event_id) {
            try {
                updateEventDetail(event, college_month_event_id, request, response)
                return response.status(200).json({ "message": "Action Completed Successfully" })
            } catch (e) {
                console.log(e)
                return response.status(500).json(e)
            }
        } else {
            try {
                insertEventDetail(event, request, response)
                return response.status(200).json({ "message": "Action Completed Successfully" })
            } catch (e) {
                console.log(e)
                return response.status(500).json(e)
            }
        }
    })
})

router.get('/', (request, response, next) => {
    get_event_detail = "select * from event_detail where college_month_event_id = ?"
    connection.query(get_event_detail, [request.query.college_month_event_id],function(err, result){
        if(!err)
        return response.status(200).json(result)
        else
        return response.status(500).json(err)
    })
})

router.get('/event-star/', (request, response, next) => {
    get_event_detail = `select es.id as id, es.college_month_event_id as college_month_event_id,
    es.student_id as student_id, s.name as student_name, es.type as type, 
    es.status as status from event_star es
    join student s on es.student_id = s.id
    where es.college_month_event_id = ${request.query.college_month_event_id}`
    connection.query(get_event_detail, function(err, result){
        if(!err)
        return response.status(200).json(result)
        else
        return response.status(500).json(err)
    })
})

module.exports = router;