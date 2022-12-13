from flask import Flask, request
from flask_cors import CORS
from linebot.models import *
from linebot import *

from dotenv import load_dotenv
import os
import requests
import json

from database import *
import check
from constants import *
from typing import *

load_dotenv()


app = Flask(__name__)
CORS(app)


line_bot_api = LineBotApi(os.getenv('CHANNEL_ACCESS_TOKEN'))
handler = WebhookHandler(os.getenv('CHANNEL_SECRET'))


@app.route("/callback", methods=['GET', 'POST'])
def callback():
    body = request.get_data(as_text=True)
    #  print(body)
    req = request.get_json(silent=True, force=True)
    intent = req["queryResult"]["intent"]["displayName"]
    text = req['originalDetectIntentRequest']['payload']['data']['message']['text']
    reply_token = req['originalDetectIntentRequest']['payload']['data']['replyToken']
    id = req['originalDetectIntentRequest']['payload']['data']['source']['userId']
    disname = line_bot_api.get_profile(id).display_name

    print('id = ' + id, flush=True)
    # print('name = ' + disname)
    # print('text = ' + text)
    # comment cause of unicode thai language
    # print('intent = ' + intent)
    # print('reply_token = ' + reply_token)

    reply(intent, text, reply_token, id, disname)

    return 'OK'


'''check intent'''


def reply(intent: str, text: str, reply_token, id, disname):
    if intent == 'add_subscribe':
        # bloodtype index
        print(text[text.find(
            'bloodtype'):], flush=True)
        user_bloodtype = text[text.find(
            'bloodtype'):].replace('bloodtype', '').replace(':', '').lstrip(' ')[0]
        text_district = text[text.find('District'):].replace('District', "")
        user_district = text_district[text_district.find(
            ':'):].replace(':', '').lstrip(' ')

        # text1 = text.split("\n")
        # splited_bloodtype, splied_district = text1[1].split(
        #     ":"), text1[2].split(":")
        # user_bloodtype, user_district = splited_bloodtype[1].replace(
        #     " ", ""), splied_district[1].replace(" ", "", 1)
        exist = update_subscriber(id)
        if check.check_bloodtype(user_bloodtype) and check.check_district(user_district):
            if len(exist) > 0:
                remove_subscriber(id)
            add_subscriber(user_bloodtype, user_district, id)
            text_message = TextSendMessage(
                text="ทำการบันทึกข้อมูลของคุณเรียบร้อยแล้ว ขอบคุณที่สมัครรับข่าวสาร")
        else:
            print(user_bloodtype, flush=True)
            print(user_district, flush=True)
            text_message = TextSendMessage(
                text="ข้อมูลของคุณมีข้อผิดพลาด กรุณาใส่รายละเอียดให้ถูกต้องอีกครั้ง")
        line_bot_api.reply_message(reply_token, text_message)

    '''remove subscriber from database'''
    if intent == 'remove_subscribe':
        # remove user's subscription
        print("Removing user from database", flush=True)
        remove_subscriber(id)
        text_message = TextSendMessage(
            text="ดำเนินการลบ subscription ของคุณเรียบร้อย")
        line_bot_api.reply_message(reply_token, text_message)

    if intent == 'test':
        text_message = TextSendMessage(text="test success")
        line_bot_api.reply_message(reply_token, text_message)
        print(id, flush=True)

    if intent == 'profile':
        user_profile = update_subscriber(id)
        if len(user_profile) == 0:
            text_message = TextSendMessage(
                text="เรายังไม่พบข้อมูลของคุณ%s กรุณาลงทะเบียนข้อมูลของคุณก่อน" % disname)
        else:
            text_message = TextSendMessage(text="ข้อมูลส่วนบุคคลของคุณ %s คือ\nกลุ่มโลหิต : %s\nเขต : %s" % (
                disname, user_profile[0].bloodtype, user_profile[0].district))
        line_bot_api.reply_message(reply_token, text_message)

    if intent == 'news':
        response_info = get_announcement()
        reply_text = ""
        if len(response_info) == 0:
            reply_text = "ตอนนี้ยังไม่มีข่าวสารประกาศ"
        else:
            for i in range(0, (len(response_info))):
                reply_text += ("ประกาศด่วน ! \nตอนนี้ต้องการรับบริจาคเลือดกรุ๊ป %s\nสำหรับผู้ที่อยู่ใกล้เคียงบริเวณเขต%s ทาง%sกำลังต้องการเลือดเพิ่มสำหรับผู้ป่วยชื่อ %s นามสกุล %s"
                               % (response_info[i].bloodtype, response_info[i].district, response_info[i].hospital, response_info[i].name, response_info[i].surname))
                if i != len(response_info)-1:
                    reply_text += "\n\n"
        text_message = TextSendMessage(text=reply_text)
        line_bot_api.reply_message(reply_token, text_message)
        print("sending announcement to user", flush=True)


@ app.route('/announcement', methods=['POST'])
def announcement():
    # receive json
    response_info = request.get_json(silent=True, force=True)

    print(response_info['phonenumber'], flush=True)
    # add_announcement to db
    annnouncement_check = check.check_name(response_info['name']) and check.check_surname(response_info['surname']) and check.check_age(response_info['age'])\
        and check.check_phonenumber(response_info['phonenumber']) and check.check_bloodtype(response_info['bloodtype']) and check.check_hospital(response_info['hospital'])\
        and check.check_district(response_info['district'])
    date = response_info['date'].split("T")[0].split("-")
    time = response_info['date'].split("T")[1].replace('Z', '').split(":")
    if annnouncement_check == True:
        add_announcement(response_info['name'], response_info['surname'], response_info['age'], response_info['phonenumber'], response_info['bloodtype'],
                         response_info['hospital'], response_info['district'], datetime.datetime(int(date[0]), int(date[1]), int(date[2]), int(time[0]), int(time[1]), int(time[2].split('.')[0])), response_info['note'])
        print("successfully add announcement info", flush=True)
    else:
        print("failed to add announcement info", flush=True)

    # multicast to user
    lst_users_id = []
    targets = get_subscriber(
        response_info['bloodtype'], response_info['district'])
    for i in range(len(targets)):
        lst_users_id.append(targets[i-1].user_id)
    text_message = "ประกาศด่วน ! \nมีความต้องการรับบริจาคเลือดกรุ๊ป %s\nสำหรับผู้ที่อยู่ใกล้เคียงบริเวณ  เขต%s ทาง%sกำลังต้องการเลือดเพิ่มสำหรับผู้ป่วยชื่อ %s นามสกุล %s"\
        % (response_info['bloodtype'], thai_district[response_info['district']], response_info['hospital'], response_info['name'], response_info['surname'])
    print(text_message, flush=True)
    message = TextSendMessage(text=text_message)
    if len(lst_users_id) <= 0:
        return 'sucess (received none)'
    line_bot_api.multicast(lst_users_id, message)
    print("sending message to : ", lst_users_id, flush=True)
    return 'success'


@ app.route('/')
def root():
    return 'ok'


"""API Endpoint for fetching latest announcement from the database"""

'''Get latest announcement from the database'''


@ app.route("/announcement/latest/<size>", methods=['GET'])
def getLatestAnnouncements(size: int = 5):
    size = int(size)
    latestNews: List[Announcement] = get_announcement(size)
    bufferNews = []
    # For some reason using map() would cause an error
    for news in latestNews:
        bufferNews.append(news.to_dict())
    return bufferNews


'''Receive an incoming announcement POST request from the server'''


@ app.route("/subscriber/<user_id>", methods=["PATCH"])
def user(user_id):
    req_data = json.loads(request.data)
    result = update_subscriber(user_id, req_data)
    return result


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True, port=5000)
