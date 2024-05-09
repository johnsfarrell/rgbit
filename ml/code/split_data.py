import os
from random import shuffle, seed
from sklearn.model_selection import train_test_split
import shutil

data_path = "../data/raw-img/"
train_path = "../data/train/"
test_path = "../data/test/"
test_size = 0.2
rs = 42

seed(rs) # sets deterministic seed for random states

if not os.path.exists(train_path):
    os.mkdir(train_path) 
if not os.path.exists(test_path):
    os.mkdir(test_path) 

for _, dirs, _ in os.walk(data_path):
    for di in dirs: # For each animal directory!
        for root, dirs, files in os.walk(os.path.join(data_path, di)):
            shuffle(files)
            train_set, test_split = train_test_split(files, test_size=test_size, random_state=rs)
            
            c = lambda path: shutil.copy(os.path.join(data_path, di, f), os.path.join(path, str(i) + ".jpeg"))
            for i, f in enumerate(train_set):
                c(train_path)
            for i, f in enumerate(test_split):
                c(test_path)

        print(di)