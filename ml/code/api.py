from flask import Flask, request, jsonify, send_file
from skimage.io import imread
import hyperparameters as hp
from util import load_model, resize_image, fix_dims, predict_color, upscale_color, rgb_to_byte_arr

app = Flask(__name__)

MODEL = load_model()

@app.route('/api', methods=['POST'])
def api():
    """
    The API endpoint.
    The image is received as a POST request.
    The image is resized, checked for the correct number of channels,
    colorized, and sent back as a response.

    Development server:
        1. `export FLASK_APP=api`
        2. `flask run`

    Returns:
        Response: The colorized image.

    Raises:
        JSONDecodeError: If the request does not contain an image.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    img = imread(request.files['file'])
    img = fix_dims(img)

    downscaled_img = resize_image(img, (hp.img_size, hp.img_size))
    colored_lab = predict_color(downscaled_img, MODEL)
    upscaled_rgb = upscale_color(img, colored_lab)

    return send_file(rgb_to_byte_arr(upscaled_rgb), mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
