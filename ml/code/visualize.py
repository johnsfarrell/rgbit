from skimage.io import imread
import matplotlib.pyplot as plt
from skimage.io import imread
from util import load_model, resize_image, fix_dims, predict_color, upscale_color
import hyperparameters as hp

MODEL = load_model()

def visualize_image(image_path):
    """
    Tests the model on image at path.

    Visualizes the original image (ground truth), grayscale image, and the predicted image.
    """
    img = imread(image_path)
    img = fix_dims(img)

    downscaled_img = resize_image(img, (hp.img_size, hp.img_size))
    colored_lab = predict_color(downscaled_img, MODEL)
    upscaled_rgb = upscale_color(img, colored_lab)

    # Create a single row plot
    fig, axs = plt.subplots(1, 3, figsize=(15, 5))
    # Plot each image
    axs[0].imshow(colored_lab[:, :, 0], cmap='gray')
    axs[0].set_title('Image L')

    axs[1].imshow(img)
    axs[1].set_title('Original Image')

    axs[2].imshow(upscaled_rgb)
    axs[2].set_title('Predicted RGB Image')

    plt.tight_layout()
    plt.show()

"""
Usage: python visualize.py
"""
IMAGE_PATH = "test_images/test_image_1.jpg"
visualize_image(IMAGE_PATH)
