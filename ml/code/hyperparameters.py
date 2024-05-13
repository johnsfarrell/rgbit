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
Resize image size.
"""
img_size = 224

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

"""
Length of training and test data.
"""
train_length = 328500

"""
Length of test data.
"""
test_length = 36500

"""
Number of steps per epoch.
"""
steps_per_epoch = (train_length // batch_size) // 32

"""
Number of validation steps.
"""
validation_steps = (test_length // batch_size) // 32
