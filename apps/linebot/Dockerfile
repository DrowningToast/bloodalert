FROM python:3
WORKDIR /usr/src/app/web/linebot
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 80
CMD ["python", "./app.py"]