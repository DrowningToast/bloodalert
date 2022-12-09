from flask import Flask, request
from linebot.models import *
from linebot import *

from dotenv import load_dotenv
import os, requests, json
from database import *

load_dotenv()

app = Flask(__name__)

line_bot_api = LineBotApi(os.getenv('CHANNEL_ACCESS_TOKEN'))
handler = WebhookHandler(os.getenv('CHANNEL_SECRET'))

all_district = ["Bang Bon", "Bang Kapi", "Bang Khae", "Bang Khen","Bang Kho Laem","Bang Khun Thian",\
   "Bang Na","Bang Phlat","Bang Rak","Bang Sue","Bangkok Noi","Bangkok Yai","Bueng Kum","Chatuchak",\
   "Chom Thong","Din Daeng","Don Mueang","Dusit","Huai Khwang","Khan Na Yao","Khlong Sam Wa",\
   "Khlong San","Khlong Toei","Lak Si","Lat Krabang","Lat Phrao","Min Buri","Nong Chok","Nong Khaem",\
   "Pathum Wan","Phasi Charoen","Phaya Thai","Phra Khanong","Phra Nakhon","Pom Prap Sattru Phai",\
   "Prawet","Rat Burana","Ratchathewee","Sai Mai","Samphanthawong","Saphan Sung","Sathon","Suan Luang",\
   "Taling Chan","Thawi Watthana","Thon Buri","Thung Khru","Wang Thonglang", "Vadhana", "Yannawa"]
all_bloodtype = ["A", "B", "O", "AB"]

@app.route("/callback", methods=['GET','POST'])
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

    reply(intent,text,reply_token,id,disname)


    return 'OK'

def reply(intent,text,reply_token,id,disname):
   if intent == 'add_subscribe':
      #make bloodtype and district into varieble
      text1 = text.split("\n")
      splited_bloodtype, splied_district = text1[2].split(":"), text1[3].split(":")
      bloodtype, district = splited_bloodtype[1].replace(" ", ""), splied_district[1].replace(" ","", 1)
      #validating information
      if (bloodtype in all_bloodtype) and (district in all_district):
         print("All information are validated", flush=True)
         add_subscriber(bloodtype, district, id)
      else:
         print("Some information are wrong", flush=True)
   if intent == 'remove_subscribe':
      #remove user's subscription
      print("Removing user from database", flush=True)
      remove_subscriber(id)
   # if intent == 'test':
   #    text_message = TextSendMessage(text="test success")
   #    line_bot_api.reply_message(reply_token, text_message)


@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name

@app.route('/test')
def test():
   lst_users_id = [] # actually use this list
   user_ids = ["U59f17870b2143e19c8ffb7de23c5151f"] # list for the test

   # receive json api
   response = requests.get('http://localhost:8080/getUsers').text
   response_info = json.loads(response)
   targets = get_subscriber(response_info['bloodtype'], response_info['district'])
   for i in range(len(targets)):
      lst_users_id.append(targets[i-1].user_id)
   
   text_message = "URGENT ! \nIn need of group %s blood type\nanyone in %s area at %s that can help please come.\nName : %s   Surname : %s"\
      %(response_info['bloodtype'], response_info['district'], response_info['hospital'], response_info['name'], response_info['surname'])
   
   message = TextSendMessage(text=text_message)
   line_bot_api.multicast(user_ids, message) # lst_users_id cannot be used cause of make up line id in db
   # print (text_message, flush=True)
   return 'success'

@app.route('/')
def nottes():
   return 'ok'

@app.route('/test2')
def test2():

   return 'success'


@app.route("/subscriber/<user_id>", methods=["PATCH"])
def user(user_id):
      req_data = json.loads(request.data)
      result = update_subscriber(user_id, req_data)
      return result
      

if __name__ == '__main__':
   app.run(debug=True,)
