#!/bin/bash

echo "Starting both client and server..."

export FLASK_APP=api

(cd client && npm run start) &

(cd server && npm run start) &

wait

if ! ls ml/models/*.h5 1> /dev/null 2>&1; then # download models if not present
    echo "Models not found. Downloading models... (cd ml/models && ./download.sh)"
    cd ml/models && ./download.sh
fi

(cd ml/code && flask run) &

wait
echo "Both client and server have started."