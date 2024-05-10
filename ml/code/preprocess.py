import os
import hyperparameters as hp
from skimage import color
from skimage.transform import resize
import keras

class Datasets:
    """
    Class for containing the training and test sets, as well as other data related functions.
    """

    def __init__(self, data_path):
        """
        Initialize the Dataset object.
        """
        self.data_path = data_path

        self.train_data = self.get_data(os.path.join(self.data_path, "train/"))
        self.test_data = self.get_data(os.path.join(self.data_path, "test/"))   

    def get_data(self, path):
        """
        Gets the data at path, augments it for flips. Generates the data.
        """
        data = keras.preprocessing.image.ImageDataGenerator(
            horizontal_flip=True,
            preprocessing_function=self.preprocess_fun)

        data = data.flow_from_directory(
            path,
            target_size=(hp.img_size, hp.img_size),
            batch_size=hp.batch_size,
            shuffle=False,
        )
        return self.rgb_to_lab(data)

    def rgb_to_lab(self, dat):
        """
        Converts the RGB data to L+AB data.
        """
        for im in dat:
            im = color.rgb2lab(im[0])
            # We return a light image (we just copy the same channel 3 times for VGG), and AB channel image.
            yield (im[:, :, :, [0, 0, 0]], im[:, :, :, [1, 2]])

    def preprocess_fun(self, img):
        """Preprocess function for ImageDataGenerator."""
        img = img / 255.0
        # resize image to 224x224
        img = resize(img, output_shape=(hp.img_size, hp.img_size, 3))
        return img
