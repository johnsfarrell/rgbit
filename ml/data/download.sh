#!/bin/bash

# training data
wget http://data.csail.mit.edu/places/places365/test_256.tar
mkdir train
tar -xvf test_256.tar -C train/.

# testing data
wget http://data.csail.mit.edu/places/places365/val_256.tar
mkdir test
tar -xvf val_256.tar -C test/.

# clean up tar files
rm test_256.tar
rm val_256.tar