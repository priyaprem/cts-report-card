const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.get('/all/', (request, response, next) => {
    query = `select cme.id, cme.college_id, c.name as college_name, c.college_key, cme.month_id, m.name as month_name, m.month_key, e.name 
    from college_month_event cme
    join college c on c.id = cme.college_id
    join month m on m.id = cme.month_id
    join event e on e.id = cme.event_id
    where c.id = ${request.query.college_id} and m.id = ${request.query.month_id}
    order by cme.college_id, cme.month_id;`;
    connection.query(query, (err, result) => {
        if(!err){
            return response.status(200).json(result);
        } else {
            return response.status(500).json(err)
        }
    })
})



module.exports = router;