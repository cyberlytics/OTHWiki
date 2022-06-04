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
python -m pytest
```
This is possible because the `pytest` library is included in the requirements.  
NOTE: Tests can also be started with a simple `pytest`, but this requires that the current path was added to `PYTHONPATH` before. Otherwise there could be some errors due to `ModuleNotFoundExceptions`