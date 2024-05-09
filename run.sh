#!/bin/bash

echo "Starting both client and server..."

(cd client && npm run start) &

(cd server && npm run start) &

wait
echo "Both client and server have started."