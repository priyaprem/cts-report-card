import mysql.connector

other_college = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="other"
)

cts = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="cts"
)

other_college_cursor = other_college.cursor()
other_college_cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'other'")
other_college_list = other_college_cursor.fetchall()

events_list = []

for x in other_college_list:
    sql = 'select * from ' + x[0]
    other_college_cursor.execute(sql)
    other_college_events_list = other_college_cursor.fetchall()
    for x in other_college_events_list:        
        for event in x:
            if isinstance(event, str) and len(event) > 0 and event != '-1':
                events_list.append(event.upper())

events_list_new = sorted(list(set(events_list)))

cts_cursor = cts.cursor()
for event in events_list_new:
    sql = 'insert into event(name, event_key) values (%s,%s)'
    val = (event.upper(), ("_").join(event.split(" ")).lower())
    cts_cursor.execute(sql,val)
    
cts.commit()
