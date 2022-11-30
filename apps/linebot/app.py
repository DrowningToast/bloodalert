from flask import Flask, request
from linebot.models import *
from linebot import *

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

line_bot_api = LineBotApi(os.getenv('CHANNELACCESSTOKEN'))
handler = WebhookHandler(os.getenv('CHANNELSECRET'))

@app.route("/callback", methods=['POST'])
def callback():
    body = request.get_data(as_text=True)
    # print(body)
    req = request.get_json(silent=True, force=True)
    intent = req["queryResult"]["intent"]["displayName"]
    text = req['originalDetectIntentRequest']['payload']['data']['message']['text']
    reply_token = req['originalDetectIntentRequest']['payload']['data']['replyToken']
    id = req['originalDetectIntentRequest']['payload']['data']['source']['userId']
    disname = line_bot_api.get_profile(id).display_name

    print('id = ' + id)
    print('name = ' + disname)
    print('text = ' + text)
    print('intent = ' + intent)
    print('reply_token = ' + reply_token)

    reply(intent,text,reply_token,id,disname)

    return 'OK'


def reply(intent,text,reply_token,id,disname):
    if intent == 'test':
        text_message = TextSendMessage(text='ทดสอบสำเร็จ')
        line_bot_api.reply_message(reply_token,text_message)

@app.route('/test')
def test():
   total = 1 + 1
   return "%s"%(os.getenv('TEST'))

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name

@app.route('/test')
def test2():
   update_subscriber("1234", {"bloodtype":"AB", "district":"Latkrabang"})
   return ("success")

@app.route("/subscriber/<user_id>", methods=["PATCH"])
def user(user_id):
      req_data = json.loads(request.data)
      result = update_subscriber(user_id, req_data)
      return result
      
   

if __name__ == '__main__':
   app.run(debug=True,)
