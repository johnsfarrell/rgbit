# [RGBIT.io](https://johnsfarrell.github.io/rgbit)

![rgbit-recolor-banner](https://github.com/johnsfarrell/rgbit/assets/69059806/aa7655a4-1264-46e7-b191-c601795d02f1)

[![pages-build-deployment](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment)
<a target="_blank" href="https://colab.research.google.com/github/johnsfarrell/rgbit/blob/main/ml/code/rgbit.ipynb">
<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

RGBIT is a completely open-source and free platform for restoring color to black and white images.

<hr>

## Resources and Contents

- [Website](https://johnsfarrell.github.io/rgbit)
  - [API Documentation](https://johnsfarrell.github.io/rgbit#api)
  - [About](https://johnsfarrell.github.io/rgbit#about)
- [Research Paper](https://johnsfarrell.github.io/rgbit/research.pdf), [Poster](https://johnsfarrell.github.io/rgbit/poster.pdf)
  - [Model Summary](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#model-summary)
  - [Example Results](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#example-results)
- [Local Setup](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#local-setup)
  - [Clientless and Serverless Colorization](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#clientless-and-serverless-colorization)
  - [Training](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#training)
  - [Usage](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#usage)
- [Developer Stack](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#built-on-mern)

## Model Summary

We implemented a convolutional neural network (CNN) to colorize grayscale images using a U-Net architecture with the VGG-19 model. U-Net is a popular deep learning architecture known for its effectiveness in image segmentation tasks. VGG-19 is a large model with almost 150 million parameters that is pre-trained. It is traditionally used for feature detection and was adapted for colorizing in our project. Our model is trained using the MIT Places365 dataset, which contains 365,000 images of scenes (which we split into 328,500 train and 36,500 test images, a 90/10 split). Moreover, the model makes use of a custom Perceptual Loss function for a higher level chromatic evaluation of the CNN. Our results show that the model produces vibrant and realistically colored images. This project reinforces the potential of deep learning in creative image processing. Below is was our VGG-19 U-Net architecture.

![Architecture](https://github.com/johnsfarrell/rgbit/assets/69059806/4cd5e928-5f3f-447b-82cf-5aff1e79541d)

## Example Results

The results of perceptual loss showed our model and architecture is viable for creating naturally looking colorful photos, but doesn't correctly account for unique coloring and saturation. Colors returned are plausible and look natural to the human eye. The model can be used to color any grayscale image, but has best use-cases for naturally existing photos, such as old black and white photography or night vision goggles. Below are some example results from our model. The first image is the L channel, the second image is the truth coloring, and the third image is the predicted coloring.

|  |  |
|---|---|
| ![Image 1](https://github.com/johnsfarrell/rgbit/assets/69059806/be1b9a85-d711-419c-bb0c-aef9467b27a8) | ![Image 2](https://github.com/johnsfarrell/rgbit/assets/69059806/bde14421-3c57-4500-b9f3-f45e1eff00a7) |
| ![Image 3](https://github.com/johnsfarrell/rgbit/assets/69059806/80d40b76-cb8c-4e88-bb88-da651c537dc3) | ![Image 4](https://github.com/johnsfarrell/rgbit/assets/69059806/461df0fb-edd6-48d3-ba10-f1688606610c) |
| ![Image 6](https://github.com/johnsfarrell/rgbit/assets/69059806/7d3d15f5-d6db-411b-afe2-5ee2283b2f70) | ![Image 8](https://github.com/johnsfarrell/rgbit/assets/69059806/2f39efb1-e6c3-475a-8b15-bf7302373add) |
|  |  |



## Local Setup

> **Note:** Local client and server setup requires a cloud [MongoDB URI](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) and [generating RSI keys](https://www.ssh.com/ssh/keygen/). The database is for storing results, and the RSI keys are for API key authentication. Feel free to skip around the local setup to find what you're looking for. [Here](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#clientless-and-serverless-colorization) covers using just the `ml/` directory and `ml/code/visualize.py` to colorize images from the terminal.

Clone the repository:

```bash
$ git clone https://github.com/johnsfarrell/rgbit
```

If you want to play with the pre-trained model, navigate to `ml/models` and run `download.sh`:

```bash
$ cd ml/models && ./download.sh
```

If you are interested in modifying the model architecture and training a model yourself, see [here](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#training).

Setup `.env` files in `client` and `server` directories:

```bash
$ cp client/.env.example client/.env
$ cp server/.env.example server/.env
```

The `client` and `server` directories depend on MongoDB and RSA keys. Obtain a [MongoDB URI](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) and [generate RSI keys](https://www.ssh.com/ssh/keygen/). Update the `.env` files with the appropriate values.

Once you have the `model.h5` file in `ml/models`, you can run the server and both `.env` files are set up, use the `go` script to run the application:

```bash
$ ./go
```

The `go` script should let you know if you missed one of the steps above, and will promp you to install the necessary dependencies if you haven't already.

#### Clientless and Serverless Colorization

You can also use `ml/code/visualize.py` to colorize images without the client and server. Please make sure you have `ml/models/model.h5` downloaded. Specify an image (path) to color at the bottom of `ml/code/visualize.py`.

```bash
$ cd ml/models && ./download.sh
$ cd ../code && export IMAGE_PATH=test_images/test_image_1.py && python3 visualize.py
```

#### Training

To train your own model, start by downloading the training data:

```bash
$ cd ml/data && ./download.sh
```

Feel free to modify the model architecture (`model.py`), hyperparameters (`hyperparameters.py`), and dataset preprocessing and augmentation (`preprocess.py`). When you're ready, train the model by running:

```bash
$ cd ml/code && python3 main.py
```

### Usage

Navigate to `http://localhost:3000` to use the application.

The API is available at `http://localhost:5000`.

The colorize endpoint is available at `http://localhost:5000/colorize`.

### Built on MERN+

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

### Trained on [Places365](http://places.csail.mit.edu/)

![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

> **Disclaimer:** _When using our [live deployment](https://johnsfarrell.github.io/rgbit/) or [api](https://johnsfarrell.github.io/rgbit#api), you agree to our [terms and conditions](https://johnsfarrell.github.io/rgbit/#tos). This includes storing user uploaded images. If you choose to create your own instance, we do not track your usage._
