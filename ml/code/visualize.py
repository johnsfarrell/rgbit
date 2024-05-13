import matplotlib.pyplot as plt
from matplotlib import gridspec
from skimage.io import imread
from util import load_model, predict
import argparse

def visualize(original, predicted):
    """
    Tests the model on image at path.

    Visualizes the original image (ground truth), grayscale image, and the predicted image.
    """
    _, axs = plt.subplots(1, 3, figsize=(15, 5))

    axs[0].imshow(original[:, :, 0], cmap='gray')
    axs[0].set_title('Image L')

    axs[1].imshow(original)
    axs[1].set_title('Original Image')

    axs[2].imshow(predicted)
    axs[2].set_title('Predicted RGB Image')

    plt.tight_layout()
    plt.show()

def save(original, predicted):
    """
    Tests the model on image at path.

    Visualizes the original image (ground truth), grayscale image, and the predicted image.
    """
    plt.figure(figsize=(15, 5), frameon=False)
    gs = gridspec.GridSpec(1, 3, wspace=0, hspace=0)
    
    ax1 = plt.subplot(gs[0])
    ax1.imshow(original[:, :, 0], cmap='gray')
    ax1.axis('off')

    ax2 = plt.subplot(gs[1])
    ax2.imshow(original)
    ax2.axis('off')

    ax3 = plt.subplot(gs[2])
    ax3.imshow(predicted)
    ax3.axis('off')

    plt.subplots_adjust(left=0, right=1, top=1, bottom=0, wspace=0, hspace=0)
    plt.savefig('result.png', bbox_inches='tight', pad_inches=0)

def main():
    parser = argparse.ArgumentParser(description="Visualize and optionally save an image.")
    parser.add_argument("-i", "--image", default="test_images/test_image_1.jpg", help="Path to the image file.")
    parser.add_argument("-v", "--visualize", action="store_true", help="Enable visualization of the image. (Default: True)")
    parser.add_argument("-s", "--save", action="store_true", help="Save the image after processing. (Default: False)")
    
    args = parser.parse_args()
    image_path, v, s = args.image, args.visualize, args.save
    
    if not (v or s):
        print("Must specify either --visualize or --save.")
        return
    
    model = load_model()
    
    img = imread(image_path)
    upscaled_rgb = predict(img, model)
    if v: visualize(img, upscaled_rgb)
    if s: save(img, upscaled_rgb)

if __name__ == "__main__":
    main()