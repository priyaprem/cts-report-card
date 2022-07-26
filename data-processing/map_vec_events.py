import mysql.connector

cts = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="cts"
)

cts_cursor = cts.cursor()

cts_cursor.execute("select cme.id, e.name from college_month_event cme join event e on e.id = cme.event_id where cme.college_id = 3")

all_vec_events = cts_cursor.fetchall()

for event in all_vec_events:
    sql = 'insert into event_detail(college_month_event_id, event_name) values (%s,%s)'
    val = (event[0], event[1])
    cts_cursor.execute(sql,val)
    
cts.commit()
    
