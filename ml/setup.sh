#!/bin/bash

echo "create venv   -- python3 -m venv venv"
echo "activate venv -- source venv/bin/activate"
echo "download reqs -- pip3 install -r requirements.txt"
echo "run server    -- cd code && export FLASK_APP=api && flask run -h localhost -p 4004"