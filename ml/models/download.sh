#!/bin/bash

export STATIC_DOWNLOAD_URL="http://localhost:4000/models/model.h5"

if [ -f ../../server/static/model.h5 ]; then
    cp ../../server/static/model.h5 .
else
    wget $STATIC_DOWNLOAD_URL
fi
