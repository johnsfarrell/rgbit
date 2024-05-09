"""
Originally for
Homework 5 - CNNs
CS1430 - Computer Vision
Brown University

RGBaddies Reworked.
"""

import os
import argparse
from datetime import datetime
import tensorflow as tf
import keras
import hyperparameters as hp
from model import Model
from preprocess import Datasets
from tensorboard_utils import CustomModelSaver

def parse_args():
    """ Perform command-line argument parsing. """

    parser = argparse.ArgumentParser(
        description="Let's colorize some images!",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    
    parser.add_argument(
        '--load-checkpoint',
        default=None,
        help='''Path to model checkpoint file (should end with the
        extension .h5). Checkpoints are automatically saved when you
        train your model. If you want to continue training from where
        you left off, this is how you would load your weights.'''
    )
    
    parser.add_argument(
        '--evaluate',
        action='store_true',
        help='''Skips training and evaluates on the test set once.
        You can use this to test an already trained model by loading
        its checkpoint.'''
    )

    return parser.parse_args()

def train(model, datasets, checkpoint_path="checkpoints/", logs_path="logs/", init_epoch=0):
    """ Training routine. """

    # Keras callbacks for training
    callback_list = [
        tf.keras.callbacks.TensorBoard(
            log_dir=logs_path,
            update_freq='batch',
            profile_batch=0),
        CustomModelSaver(checkpoint_path, hp.max_num_weights)
    ]

    # Begin training
    model.fit(datasets.train_data,
          batch_size=hp.batch_size,
          epochs=hp.num_epochs,
          validation_data=datasets.test_data,
          steps_per_epoch=hp.steps_per_epoch,
          validation_steps=hp.validation_steps,
          callbacks=callback_list
    )

def test(model, test_data):
    """ Testing routine. """
    # Run model on test set
    model.evaluate(
        x=test_data,
        verbose=1,
    )


def main():
    """ Main function. """

    time_now = datetime.now()
    timestamp = time_now.strftime("%m%d%y-%H%M%S")
    init_epoch = 0

    datasets = Datasets('..'+os.sep+'data'+os.sep)
    print("Datasets compiled")
    model = Model()
    model_arch = model.mod
    checkpoint_path = "checkpoints" + os.sep + \
        "vgg19_model" + os.sep + timestamp + os.sep
    logs_path = "logs" + os.sep + "vgg19_model" + \
        os.sep + timestamp + os.sep
    
    # Print summaries for both parts of the model
    model_arch.summary()

    if not os.path.exists(checkpoint_path):
        os.makedirs(checkpoint_path)
    # Compile model graph
    model_arch.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=hp.learning_rate),
        loss=model.percept_loss_func,
        metrics=[keras.metrics.MeanSquaredError()]
    )
    train(model_arch, datasets, checkpoint_path, logs_path, init_epoch)

# Make arguments global
ARGS = parse_args()

if __name__ == "__main__":
    main()