from flask import Flask, request
from linebot.models import *
from linebot import *

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/test')
def test():
   total = 1 + 1
   return "%s"%(os.getenv('TEST'))

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name
 
if __name__ == '__main__':
   app.run(debug=True,)
