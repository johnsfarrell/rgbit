#!/bin/bash

echo "Starting the application locally. To compose with Docker, instead run 'docker-compose up'!"

for port in 3000 4000 4004; do
  if lsof -i:$port -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $port is already in use."
    read -p "Force terminate processes on {3000, 4000, 4004}? (y/N): " response
    case $response in
      [Yy]* )
        echo "Force terminating process on ports {3000, 4000, 4004}."
        kill -9 $(lsof -t -i:3000) $(lsof -t -i:4000) $(lsof -t -i:4004)
        ;;
      * )
        echo "Exiting..."
        exit 1
        ;;
    esac
  fi
done

if ! ls ml/venv/bin/activate 1> /dev/null 2>&1; then
    echo "Python virtual environment not found. (hint: cd ml && ./setup.sh)"
    exit 1
fi

if ! ls ml/models/*.h5 1> /dev/null 2>&1; then
    echo "Models not found. Check the GitHub README to find the model.h5 files."
    exit 1
fi

# Check for .env files in the client and server directories
if [ ! -f client/.env ]; then
  echo "Missing .env file in client directory. (hint: client/.env.example)"
  exit 1
fi

if [ ! -f server/.env ]; then
  echo "Missing .env file in server directory. (hint: server/.env.example)"
  exit 1
fi

read -p "Reinstall node modules? (y/N): " response
if [[ "$response" == "y" || "$response" == "Y" ]]; then
    echo "Reinstalling node modules."
    rm -rf client/node_modules server/node_modules
    (cd client && npm install)
    (cd server && npm install)
fi

(cd client && npm run start) &

(cd server && npm run start) &

source ml/venv/bin/activate && cd ml/code && python3 api.py
