from skimage.io import imread
import matplotlib.pyplot as plt
from skimage.color import rgb2lab, lab2rgb
import numpy as np
from skimage.io import imread
from util import load_model
from skimage.transform import resize
import hyperparameters as hp

MODEL = load_model()

def visualize_image(image_path):
    """
    Tests the model on image at path.

    Visualizes the original image (ground truth), grayscale image, and the predicted image.
    """
    img = imread(image_path)
    img = resize(img, output_shape=(hp.img_size, hp.img_size, 3))
    img / 255.0
    image_lab = rgb2lab(img)
    image_l = image_lab[:, :, [0, 0, 0]]

    # Run the model on image_l to get predicted ab channels
    image_ab = MODEL.predict(image_l[np.newaxis, ...])
    print(image_ab)
    image_ab = image_ab[0]
    image_lab[:, :, [1, 2]] = image_ab
    image_rgb_predicted = lab2rgb(image_lab * 1.3)
    print(image_rgb_predicted)
    # Create a single row plot
    fig, axs = plt.subplots(1, 3, figsize=(15, 5))
    # Plot each image
    axs[0].imshow(image_l / 100.0)
    axs[0].set_title('Image L')

    axs[1].imshow(img)
    axs[1].set_title('Original Image')

    axs[2].imshow(image_rgb_predicted)
    axs[2].set_title('Predicted RGB Image')

    plt.tight_layout()
    plt.show()

    plt.imshow(image_ab[:, :, 0], cmap="gray")
    plt.show()

"""
Usage: python visualize.py
"""
IMAGE_PATH = "test_images/test_image_1.jpg"
visualize_image(IMAGE_PATH)
