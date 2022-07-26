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

month = {}
college = {}
event = {}

cts_cursor = cts.cursor()

cts_cursor.execute('select * from month')

result = cts_cursor.fetchall()

month_val = 1
for x in result:
    month[x[2]] = month_val
    month_val = month_val + 1

cts_cursor.execute('select * from college')

result = cts_cursor.fetchall()

college_val = 1
for x in result:
    college[x[2]] = college_val
    college_val = college_val + 1


cts_cursor.execute('select * from event')

result = cts_cursor.fetchall()

event_val = 1
for x in result:
    event[x[2]] = event_val
    event_val = event_val + 1

other_college_cursor = other_college.cursor()
other_college_cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'other'")
other_college_list = other_college_cursor.fetchall()

mapping = []

for x in other_college_list:
    college_key = x[0].upper()
    if college_key in college:
        sql = 'select * from ' + x[0]
        other_college_cursor.execute(sql)
        events = other_college_cursor.fetchall()
        for row in events:
            month_val = 1
            for item in row:
                if isinstance(item, str) and len(item) > 0 and item != '-1':
                    event_key = "_".join(item.split(" ")).lower()
                    if event_key in event:
                        mapping.append([college[college_key], month_val, event[event_key]])
                    else:
                        mapping.append([college[college_key], month_val, -1])
                month_val += 1
        
for row in mapping:
    sql = "insert into college_month_event(college_id, month_id, event_id) values (%s, %s, %s)"
    val = (row[0], row[1], row[2])
    cts_cursor.execute(sql, val)

cts.commit()