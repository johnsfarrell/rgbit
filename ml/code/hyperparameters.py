"""
Number of epochs. We as you to use only 50 epochs as your budget.
If you experiment with more complex networks, you can change this.
"""
num_epochs = 50

"""
A critical parameter that can dramatically affect whether training
succeeds or fails. The value for this depends significantly on which
optimizer is used. Refer to the default learning rate parameter
"""
learning_rate = 1e-2

"""
Momentum on the gradient (if you use a momentum-based optimizer)
"""
momentum = 0.01

"""
Resize image size.
"""
img_size = 224

"""
Sample size for calculating the mean and standard deviation of the
training data. This many images will be randomly seleted to be read
into memory temporarily.
"""
preprocess_sample_size = 400

"""
Maximum number of weight files to save to checkpoint directory. If
set to a number <= 0, then all weight files of every epoch will be
saved. Otherwise, only the weights with highest accuracy will be saved.
"""
max_num_weights = 10

"""
Defines the number of training examples per batch.
"""
batch_size = 64


train_length = 328500
test_length = 36500
steps_per_epoch = (train_length // batch_size) // 32
validation_steps = (test_length // batch_size) // 32

loss_function = "mean_squared_error"
