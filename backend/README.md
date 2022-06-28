# Backend

## Requirements 

Step 1: Create virtualenv (optional)
```bash
python -m venv venv

#Windows
./venv/Scripts/activate

#Linux
source ./venv/bin/activate
```

Step 2: Download requirements
```bash
pip install -r requirements.txt
```

## Database
The app requires a **MongoDB** database. There are three ways to create this locally:

1. Download and run MongoDB from the [official Website](*https://www.mongodb.com/) or from prefered package manager.
    
2. Start via Docker 
```bash 
#check that docker is running 
docker ps 

#start the DB
docker run --name mongodb -d -p 27017-27019:27019-27019 mongo:4.4
```

3. Use docker-compose
```bash
#navigate to the root folder ~/oth-wiki 
cd ..

#start only the mongodb container
docker-compose up -d mongodb
```

## Start the app 
The app uses the 'uvicorn' server for providing the API. It can be started with
```bash
python -m backend
```

An alternative would be
```bash
uvicorn backend:app [--flags]
```
## Run tests
Run the test with:
```bash
python -m pytest -s
```
This is possible because the `pytest` library is included in the requirements. The `-s` flag at the end is needed for proper testing setup 

NOTE: Tests can also be started with a simple `pytest -s`, but this requires that the current path was added to `PYTHONPATH` before. Otherwise there could be some errors due to `ModuleNotFoundExceptions`

## Test Coverage

If you want to run the tests and check code coverage, use (`PYTHONPATH` needs to be set):
```bash
pytest -s --cov=backend
```

The current test coverage is:  

|Name                       |Stmts |Miss |Cover |
|:---                       |---   |:---:|  ---:|
|backend\__init__.py        |17    |0    |  100%|
|backend\__main__.py        | 3    |3    |    0%|
|backend\config.py          |10    |0    |  100%|
|backend\database.py        |18    |9    |   50%|
|backend\models\article.py  |26    |0    |  100%|
|backend\models\category.py |12    |0    |  100%|
|backend\routes\article.py  |61    |5    |   92%|
|backend\routes\category.py |65    |3    |   95%|
||||
|TOTAL                      |212   |20   |   91%|