import io
import numpy as np
from skimage.color import rgb2lab, lab2rgb, gray2rgb
from skimage.transform import resize
from PIL import Image
from model import Model
import hyperparameters as hp
import tensorflow as tf

def load_model(model="../models/model.h5"):
    """
    Load the model.

    Args:
        model (str): The path to the model file.

    Returns:
        Model: The model.
    """
    return tf.keras.models.load_model(model)

def load_weights(weights):
    """
    Load the weights of the model.

    Args:
        weights (str): The path to the weights file.

    Returns:
        Model: The model with the loaded weights.
    """
    model = Model()
    model(tf.keras.Input(shape=(hp.img_size, hp.img_size, 3)))
    model.load_weights(weights)
    return model


def resize_image(img, size=(hp.img_size, hp.img_size)):
    """
    Resize the image to the specified size.

    Args:
        img (np.array): The image to resize.
        size (tuple): The target size.

    Returns:
        np.array: The resized image.
        tuple: The original size of the image.
    """
    return resize(img, size, anti_aliasing=True, mode='reflect')

def fix_dims(img):
    """
    Check if the image is grayscale or has an alpha channel.
    If it is grayscale, convert it to RGB.
    If it has an alpha channel, remove it.

    Args:
        img (np.array): The image to check.
    
    Returns:
        np.array: The image with the correct number of channels.
    """
    if len(img.shape) == 2: 
        img = gray2rgb(img)
    elif img.shape[2] == 4: 
        img = img[:,:,:3]
    return img

def predict_color(img_rgb, model, output_lab=True):
    """
    Colorize the image.
    Convert the image to LAB color space, extract the L channel,
    predict the AB channels, and combine them to form the colorized image.

    Args:
        img_rgb (np.array): The image to colorize (RGB).
        output_lab? (bool): Whether to output the image in LAB or RGB.

    Returns:
        np.array: The colorized image in LAB (default) or RGB.
    """
    image_lab = rgb2lab(img_rgb)
    l = image_lab[:, :, [0, 0, 0]]
    predicted_ab = model.predict(l[np.newaxis, ...])[0]
    image_lab[:, :, [1, 2]] = predicted_ab
    return image_lab if output_lab else lab2rgb(image_lab * 1)

def upscale_color(original_img, color_lab):
    """
    Upscale the colorized image to the original size.

    Args:
        original_img (np.array): The original image in RGB.
        color_lab (np.array): The colorized image in LAB.

    Returns:
        np.array: The upscaled colorized image in RGB.
    """
    shape = original_img.shape[:2]
    color_lab = resize_image(color_lab, shape)
    original_lab = rgb2lab(original_img)

    ab = color_lab[:, :, 1:]
    original_lab[:, :, 1:] = ab

    return lab2rgb(original_lab)


def rgb_to_byte_arr(img_rgb):
    """
    Convert the RGB image to a byte array.
    PIL is used to convert the image to a byte array.
    Purpose is to send the image as a response.

    Args:
        img_rgb (np.array): The RGB image.
    
    Returns:
        io.BytesIO: The byte array.
    """
    img_rgb = (img_rgb * 255).astype(np.uint8)
    img_pil = Image.fromarray(img_rgb)
    byte_arr = io.BytesIO()
    img_pil.save(byte_arr, format='PNG')
    byte_arr.seek(0)
    return byte_arr