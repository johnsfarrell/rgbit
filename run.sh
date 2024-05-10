#!/bin/bash

for port in 3000 4000 4001; do
  if lsof -i:$port -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $port is already in use. Exiting..."
    exit 1
  fi
done

if ! ls ml/models/*.h5 1> /dev/null 2>&1; then
    echo "Models not found. (hint: cd ml/models && ./download.sh)"
    exit 1
fi

echo "Starting both client and server..."

(cd client && npm i && npm run start) &

(cd server && npm i && npm run start) &

(cd ml/code && export FLASK_APP=api && flask run -h localhost -p 4001) &

wait

echo "Both client and server have started."
