import mysql.connector

other_college = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="other"
)

other_college_cursor = other_college.cursor()
other_college_cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'other'")
other_college_list = other_college_cursor.fetchall()

events_list = []

count = 0

for x in other_college_list:
    sql = 'select * from ' + x[0]
    other_college_cursor.execute(sql)
    other_college_events_list = other_college_cursor.fetchall()
    for row in other_college_events_list:
        insert_val = []        
        for event in row:
            if isinstance(event, int):
                idx = event
                insert_val.append(idx)
            if event is None:
                insert_val.append(-1)
            if isinstance(event, str):
                new_event = event
                if len(event) == 0:
                    new_event = '-1'
                insert_val.append(new_event)
        insert_sql = 'update ' + x[0] + ' set February = %s, March =%s, April =%s, May =%s, June =%s, July =%s, August =%s, September =%s, October =%s, November =%s, December =%s where id = %s'
        other_college_cursor.execute(insert_sql, tuple(insert_val))
    
other_college.commit()