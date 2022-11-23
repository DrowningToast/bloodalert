from flask import Flask, request
from linebot.models import *
from linebot import *

app = Flask(__name__)

line_bot_api = LineBotApi('XpXIxO9ts45EHxkvVH3CtEqZUCuW23NJmnYcHJJBhm74tY8cUPKPz5ZuEYhU+YlhzywvM3niT/4vq19eDEownCofhZBQ6JzFsVADIMfb0h1yhz/xf0vOR7U0DF07AlKvLlIXXreIqqZ/1wySJnEsGAdB04t89/1O/w1cDnyilFU=')
handler = WebhookHandler('bf8b2e2a91500af9b0581b87606325f6')

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

if __name__ == "__main__":
    app.run()