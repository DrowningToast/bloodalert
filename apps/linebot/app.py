from flask import Flask, request
from flask_cors import CORS
from linebot.models import *
from linebot import *

from dotenv import load_dotenv
import os
import requests
import json
from database import *
from test import *
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

    print('id = ' + id)
    print('name = ' + disname)
   #  print('text = ' + text)
   # comment cause of unicode thai language
    print('intent = ' + intent)
    print('reply_token = ' + reply_token)

    reply(intent, text, reply_token, id, disname)

    return 'OK'


def reply(intent, text, reply_token, id, disname):
    if intent == 'add_subscribe':
        text1 = text.split("\n")
        splited_bloodtype, splied_district = text1[2].split(
            ":"), text1[3].split(":")
        user_bloodtype, user_district = splited_bloodtype[1].replace(
            " ", ""), splied_district[1].replace(" ", "", 1)
        exist = update_subscriber(id)
        if check_bloodtype(user_bloodtype) and check_district(user_district):
            if len(exist) > 0:
                remove_subscriber(id)
            add_subscriber(user_bloodtype, user_district, id)
            text_message = TextSendMessage(text="ขอบคุณที่ติดตามข่าวสาร")
        else:
            text_message = TextSendMessage(
                text="กรุณาใส่รายละเอียดให้ถูกต้องอีกครั้ง")
        line_bot_api.reply_message(reply_token, text_message)
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
    if intent == 'profile':
        user_profile = update_subscriber(id)
        if len(user_profile) == 0:
            text_message = TextSendMessage(
                text="เรายังไม่พบข้อมูลของคุณ%s กรุณาลงทะเบียนก่อน" % disname)
        else:
            text_message = TextSendMessage(text="ข้อมูลส่วนบุคคลของคุณ %s คือ\nกลุ่มโลหิต : %s\nเขต : %s"
                                           % (disname, user_profile[0].bloodtype, user_profile[0].district))
        line_bot_api.reply_message(reply_token, text_message)


@app.route('/hello/<name>')
def hello_name(name):
    return 'Hello %s!' % name


@app.route('/test')
def test():
    lst_users_id = []  # actually use this list
    user_ids = ["U59f17870b2143e19c8ffb7de23c5151f"]  # list for the test

    # receive json api
    response = requests.get('http://localhost:8080/getUsers').text
    response_info = json.loads(response)
    targets = get_subscriber(
        response_info['bloodtype'], response_info['district'])
    for i in range(len(targets)):
        lst_users_id.append(targets[i-1].user_id)

    text_message = "URGENT ! \nIn need of group %s blood type\nanyone in %s area at %s that can help please come.\nName : %s   Surname : %s"\
        % (response_info['bloodtype'], response_info['district'], response_info['hospital'], response_info['name'], response_info['surname'])

    message = TextSendMessage(text=text_message)
    # lst_users_id cannot be used cause of make up line id in db
    line_bot_api.multicast(user_ids, message)
    # print (text_message, flush=True)
    return 'success'


@app.route('/')
def root():
    return 'ok'


@app.route('/test2')
def test2():
    test = update_subscriber("U59f17870b2143e19c8ffb7de23c5151f")
    print(test[0].district, flush=True)
    return 'success'


"""API Endpoint for fetching latest announcement from the database"""


@app.route("/announcement/latest/<size>", methods=['GET'])
def getLatestAnnouncements(size: int = 5):
    size = int(size)
    latestNews: List[Announcement] = get_announcement(size)
    bufferNews = []
    # For some reason using map() would cause an error
    for news in latestNews:
        bufferNews.append(news.to_dict())
    return bufferNews


@app.route("/subscriber/<user_id>", methods=["PATCH"])
def user(user_id):
    req_data = json.loads(request.data)
    result = update_subscriber(user_id, req_data)
    return result


if __name__ == '__main__':
    app.run(debug=True,)
