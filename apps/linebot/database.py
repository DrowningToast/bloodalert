import datetime
from pony.orm import *
db = Database()

class Annoucement(db.Entity):
    name = Required(str)
    surname = Required(str)
    age = Required(int)
    phonenumber = Required(str)
    bloodtype = Required(str)
    hospital = Required(str)
    district = Required(str)
    date = Required(datetime.datetime)
    note = Required(str)

class Subscriber(db.Entity):
    bloodtype = Required(str)
    district = Required(str)
    user_id = Required(str, unique=True)

db.bind(provider='postgres', user='bloodalert', password='bloodalert', host='localhost', database='bloodalert')

db.generate_mapping(create_tables=True, check_tables=True)
set_sql_debug(True)

@db_session
def test():
    return ("Hello world")


@db_session
def add_subscriber(bloodtype, district, user_id):
    new_subscriber = Subscriber(bloodtype=bloodtype, district=district, user_id=user_id)
    
@db_session
def update_subscriber(req_user_id, req_data):
    print(req_user_id)
    print(req_data)
    user = Subscriber.get(user_id=req_user_id)
    # selected_user = select(subscribe for subscribe in  Subscriber if subscribe.user_id == req_user_id).get()
    user.set(**req_data)
    return user

@db_session
def remove_subscriber(user_id):
    delete_subscriber = Subscriber(user_id=user_id).delete()
    return ("success")


