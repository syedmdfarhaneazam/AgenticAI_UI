### Running Without a Virtual Environment
```shell
# install dependencies globally
$ pip install -r requirements.txt

# start the project
$ uvicorn main:app --reload
# opens at http://127.0.0.1:8000
```
### Run using enviornment
``` shell
# create a virtual environment
$ python3 -m venv venv

# activate it
$ source venv/bin/activate     # linux / macOS
# venv\Scripts\activate      # windows

# install dependencies
$ pip install -r requirements.txt

# start the project
$ uvicorn main:app --reload
# opens at http://127.0.0.1:8000
```