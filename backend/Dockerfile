FROM python:3.10-slim

#First copy the requirments.txt and load them
COPY ./requirements.txt .
RUN python -m pip install -r requirements.txt

COPY . /

#ENV PYTHONPATH "/"

#Start the app 
ENTRYPOINT ["python"]
CMD ["-m", "backend"]
