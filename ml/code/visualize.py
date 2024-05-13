import matplotlib.pyplot as plt
from matplotlib import gridspec
from skimage.io import imread
from util import load_model, predict
import argparse
import os

def visualize(image_path, model, save=False, hide=False):
    """
    Tests the model on image at path.

    Visualizes the original image (ground truth), grayscale image, and the predicted image.

    Args:
        image_path (str): The path to the image.
        model (Model): The model.
        save (bool): Whether to save the images. (Default: False)
    """
    image_name = os.path.basename(image_path)
    original = imread(image_path)
    predicted = predict(original, model)

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
    
    if save: plt.savefig(f"output/{image_name}", bbox_inches='tight', pad_inches=0)

    if not hide: plt.show()

def main():
    parser = argparse.ArgumentParser(description="Process images for visualization and saving.")
    parser.add_argument("-i", "--image", default="test_images/test_image_1.jpg", help="Path to a single image file.")
    parser.add_argument("-d", "--directory", help="Directory containing images to process.")
    parser.add_argument("-s", "--save", action="store_true", help="Save the images after processing. (Default: False)")
    parser.add_argument("-nv", "--no-vis", action="store_true", help="No visual displayed. (Default: False)")
    
    if not os.path.exists("output"):
        os.makedirs("output")

    args = parser.parse_args()
    image_path = args.image
    directory_path = args.directory
    save = args.save
    hide = args.no_vis

    model = load_model()

    if directory_path:
        if not os.path.exists(directory_path):
            print(f"Directory {directory_path} not found.")
            return
        for filename in os.listdir(directory_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                image_path = os.path.join(directory_path, filename)
                visualize(image_path, model, save, hide)
        return

    if not os.path.isfile(image_path):
        print(f"Image file {image_path} not found.")
        return
    visualize(image_path, model, save, hide)

if __name__ == "__main__":
    main()