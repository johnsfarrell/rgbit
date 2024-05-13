# [RGBIT.io](https://johnsfarrell.github.io/rgbit)

![banner](https://github.com/johnsfarrell/rgbit/assets/69059806/1ed31966-3480-41c1-a694-a8c595b3693c)

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
  - [Usage and Commands](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#usage)
  - [Stack and Dependencies](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#built-on-mern)
- [Acknowledgements](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#Acknowledgements)

## Model Summary

We implemented a convolutional neural network (CNN) to colorize grayscale images using a U-Net architecture with the VGG-19 model. U-Net is a popular deep learning architecture known for its effectiveness in image segmentation tasks. VGG-19 is a large model with almost 150 million parameters that is pre-trained. It is traditionally used for feature detection and was adapted for colorizing in our project. Our model is trained using the MIT Places365 dataset, which contains 365,000 images of scenes (which we split into 328,500 train and 36,500 test images, a 90/10 split). Moreover, the model makes use of a custom Perceptual Loss function for a higher level chromatic evaluation of the CNN. Our results show that the model produces vibrant and realistically colored images. This project reinforces the potential of deep learning in creative image processing. Below is was our VGG-19 U-Net architecture.

![Architecture](https://github.com/johnsfarrell/rgbit/assets/69059806/4cd5e928-5f3f-447b-82cf-5aff1e79541d)

## Example Results

The results of perceptual loss showed our model and architecture is viable for creating naturally looking colorful photos, but doesn't correctly account for unique coloring and saturation. Colors returned are plausible and look natural to the human eye. The model can be used to color any grayscale image, but has best use-cases for naturally existing photos, such as old black and white photography or night vision goggles. Below are some example results from our model test dataset. The first image is the L channel, the second image is the truth coloring, and the third image is the predicted coloring.

|   |   |   |
|---|---|---|
| ![Places365_val_00015300](https://github.com/johnsfarrell/rgbit/assets/69059806/97252aa3-ff60-4b34-bcfd-8b298859e633) | ![Places365_val_00016263](https://github.com/johnsfarrell/rgbit/assets/69059806/ab2b338f-d3b7-478b-922e-4833d3c724b5) | ![Places365_val_00013593](https://github.com/johnsfarrell/rgbit/assets/69059806/9ecb55b1-04c4-46d2-86d0-eea965663165) | 
| ![Places365_val_00017696](https://github.com/johnsfarrell/rgbit/assets/69059806/262ee216-d5d5-4f2a-812f-017f91e31825) | ![Places365_val_00011056](https://github.com/johnsfarrell/rgbit/assets/69059806/8aa37f98-823e-40b7-8dd0-dc665c7f3726) | ![Places365_val_00006786](https://github.com/johnsfarrell/rgbit/assets/69059806/0070ce38-db18-4e48-bb0c-71f742e6fb72) |
| ![Places365_val_00001475](https://github.com/johnsfarrell/rgbit/assets/69059806/6987027c-d9e5-4cc3-8b76-9d5bfba24478) | ![Places365_val_00001356](https://github.com/johnsfarrell/rgbit/assets/69059806/da061c63-a17d-40b3-a605-2e313c7cd390) | ![Places365_val_00033979](https://github.com/johnsfarrell/rgbit/assets/69059806/c0b8436d-9e5f-4fde-9c7c-81acffaa60df) |
| ![Places365_val_00008392](https://github.com/johnsfarrell/rgbit/assets/69059806/22aea350-87c3-4825-a02a-b768b1c94a8a) | ![Places365_val_00007964](https://github.com/johnsfarrell/rgbit/assets/69059806/8b9a6471-f655-4624-b385-b8e8391d841f)| ![Places365_val_00007777](https://github.com/johnsfarrell/rgbit/assets/69059806/07d94c3b-ddc4-4b45-a7e4-517166a90242)

Model results on real legacy black and white photographs:

![legacy-banner](https://github.com/johnsfarrell/rgbit/assets/69059806/73f39028-c0b0-461a-9bc1-ecd34dd5e432)

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

### Clientless and Serverless Colorization

You can also use `ml/code/visualize.py` to colorize images without the client and server. Please make sure you have `ml/models/model.h5` downloaded.

```bash
$ cd ml/models && ./download.sh
$ cd ../code && python3 visualize.py # -h for help
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

The API is available at `http://localhost:4004`.

The colorize endpoint is available at `http://localhost:4004/colorize`.

#### Client Commands

| Command          | Action                                              |
| ---------------- | --------------------------------------------------- |
| `npm install`    | Installs the client dependencies                    |
| `npm run start`  | Starts the client                                   |
| `npm run build`  | Builds the client                                   |
| `npm run deploy` | Deploys the client to GitHub Pages (for production) |

#### Server Commands

| Command         | Action                           |
| --------------- | -------------------------------- |
| `npm install`   | Installs the server dependencies |
| `npm run start` | Starts the server                |

#### ML Commands

| Command                           | Action                                 |
| --------------------------------- | -------------------------------------- |
| `./data/download.sh`              | Downloads the training data            |
| `./models/download.sh`            | Downloads the pretrained `model.h5`    |
| `./setup.sh`                      | View setup commands                    |
| `source venv/bin/activate`        | Activates the virtual environment      |
| `pip install -r requirements.txt` | Installs the ML dependencies           |
| `export FLASK_APP=app.py`         | Sets the Flask app to the model server |
| `flask run -h localhost -p 4004`  | Starts the Flask model server          |
| `python3 main.py`                 | Trains the model                       |
| `python3 code/visualize.py -h`    | Commands for visualizing test image(s) |

### Built on MERN+

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

### Trained on [Places365](http://places.csail.mit.edu/)

![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

### Acknowledgements

Contributions from Tyler Gurth, John Farrell, Jania Vandevoorde, and Hunter Adrian.

Thank you to Brown University Professor [Srinath Sridhar](https://cs.brown.edu/people/ssrinath/) and Jiahua Chen for advice and insights.

> **Disclaimer:** _When using our [live deployment](https://johnsfarrell.github.io/rgbit/) or [api](https://johnsfarrell.github.io/rgbit#api), you agree to our [terms and conditions](https://johnsfarrell.github.io/rgbit/#tos). This includes storing user uploaded images. If you choose to create your own instance, we do not track your usage. [License](/LICENSE)_.
