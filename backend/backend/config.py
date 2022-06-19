#meta configs
VERSION = '0.1'

#DB connection configs
MONGO_PORT = 27017 #default mongo port
MONGO_HOST = 'localhost' #'mongodb' if run both services are run via docker-compose
MONGO_URI  = f'mongodb://{MONGO_HOST}:{MONGO_PORT}/'

MONGO_URI_DEFAULT = f'mongodb://localhost:27017/'

#additional DB configs
DB_NAME = 'oth_wiki'

#server configs
HOST = '127.0.0.1'
PORT = 8000
LOG_LEVEL='info'

CORS_ORIGINS = ['*']

