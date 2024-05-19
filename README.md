<h1>
  <a href="https://johnsfarrell.github.io/rgbit">
    <img style="height: 25px;" src="https://github.com/johnsfarrell/rgbit/blob/main/client/public/favicon.ico" href="favicon (logo)" />
    RGBIT.io
  </a>
</h1>

![banner](https://github.com/johnsfarrell/rgbit/assets/69059806/1ed31966-3480-41c1-a694-a8c595b3693c)

[![research paper](https://img.shields.io/badge/PDF%E2%86%97-Research_Paper-red)](https://johnsfarrell.github.io/rgbit/research/report.pdf)
[![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/johnsfarrell/rgbit/blob/main/ml/code/rgbit.ipynb)
[![Postman](https://img.shields.io/badge/%E2%80%8E-Open%20In%20Postman-orange.svg?logo=postman&logoColor=white)](https://www.postman.com/docking-module-cosmonaut-42592220/workspace/public/collection/26483122-3401ab13-32a9-4c81-b03d-02ca710e64a7?action=share&creator=26483122)
[![pages-build-deployment](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

RGBIT is a completely open-source and free platform for restoring color to black and white images.

<hr>

## Resources and Contents

- [Website](https://johnsfarrell.github.io/rgbit)
  - [API Documentation](https://johnsfarrell.github.io/rgbit#api)
- [Research Paper](https://johnsfarrell.github.io/rgbit/research/report.pdf), [Poster](https://johnsfarrell.github.io/rgbit/research/poster.pdf)
  - [Model Summary](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#model-summary)
  - [Example Results](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#example-results)
- [Local Setup](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#local-setup)
  - [Clientless and Serverless Colorization](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#clientless-and-serverless-colorization)
  - [Training](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#training)
  - [Usage and Commands](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#usage)
  - [Stack and Dependencies](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#built-on-mern)
- [Acknowledgements](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#Acknowledgements)

## Model Summary

We implemented a convolutional neural network (CNN) to colorize grayscale images using a U-Net architecture with the VGG-19 model. U-Net is a popular deep learning architecture known for its effectiveness in image segmentation tasks. VGG-19 is a large model with almost 150 million parameters that is pre-trained. It is traditionally used for feature detection and was adapted for colorizing in our project. Our model is trained using the MIT Places365 dataset, which contains 365,000 images of scenes (which we split into 328,500 train and 36,500 test images, a 90/10 split). Moreover, the model makes use of a custom Perceptual Loss function for a higher level chromatic evaluation of the CNN. Our results show that the model produces vibrant and realistically colored images. This project reinforces the potential of deep learning in creative image processing. Below is our VGG-19 U-Net architecture.

![Architecture](https://github.com/johnsfarrell/rgbit/assets/69059806/4cd5e928-5f3f-447b-82cf-5aff1e79541d)

## Example Results

The results of perceptual loss showed our model and architecture is viable for creating naturally looking colorful photos, but doesn't correctly account for unique coloring and saturation. Colors returned are plausible and look natural to the human eye. The model can be used to color any grayscale image, but has best use-cases for naturally existing photos, such as old black and white photography or night vision goggles. Below are some example results from our model test dataset. The first image is the L channel, the second image is the truth coloring, and the third image is the predicted coloring.

|                                                                                                                       |                                                                                                                       |                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ![Places365_val_00015300](https://github.com/johnsfarrell/rgbit/assets/69059806/97252aa3-ff60-4b34-bcfd-8b298859e633) | ![Places365_val_00016263](https://github.com/johnsfarrell/rgbit/assets/69059806/ab2b338f-d3b7-478b-922e-4833d3c724b5) | ![Places365_val_00013593](https://github.com/johnsfarrell/rgbit/assets/69059806/9ecb55b1-04c4-46d2-86d0-eea965663165) |
| ![Places365_val_00017696](https://github.com/johnsfarrell/rgbit/assets/69059806/262ee216-d5d5-4f2a-812f-017f91e31825) | ![Places365_val_00011056](https://github.com/johnsfarrell/rgbit/assets/69059806/8aa37f98-823e-40b7-8dd0-dc665c7f3726) | ![Places365_val_00006786](https://github.com/johnsfarrell/rgbit/assets/69059806/0070ce38-db18-4e48-bb0c-71f742e6fb72) |
| ![Places365_val_00001475](https://github.com/johnsfarrell/rgbit/assets/69059806/6987027c-d9e5-4cc3-8b76-9d5bfba24478) | ![Places365_val_00001356](https://github.com/johnsfarrell/rgbit/assets/69059806/da061c63-a17d-40b3-a605-2e313c7cd390) | ![Places365_val_00033979](https://github.com/johnsfarrell/rgbit/assets/69059806/c0b8436d-9e5f-4fde-9c7c-81acffaa60df) |
| ![Places365_val_00008392](https://github.com/johnsfarrell/rgbit/assets/69059806/22aea350-87c3-4825-a02a-b768b1c94a8a) | ![Places365_val_00007964](https://github.com/johnsfarrell/rgbit/assets/69059806/8b9a6471-f655-4624-b385-b8e8391d841f) | ![Places365_val_00007777](https://github.com/johnsfarrell/rgbit/assets/69059806/07d94c3b-ddc4-4b45-a7e4-517166a90242) |

Model results on real legacy black and white photographs:

![legacy-banner](https://github.com/johnsfarrell/rgbit/assets/69059806/73f39028-c0b0-461a-9bc1-ecd34dd5e432)

## Local Setup

> **Note:** Local client and server setup requires a cloud [MongoDB URI](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) and [generating RSA keys](https://www.ssh.com/ssh/keygen/). The database is for storing results, and the RSA keys are for API key authentication. Feel free to skip around the local setup to find what you're looking for. [Here](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#clientless-and-serverless-colorization) covers using just the `ml/` directory and `ml/code/visualize.py` to colorize images from the terminal.

Clone the repository:

```bash
$ git clone https://github.com/johnsfarrell/rgbit
```

In most cases, you'll be using the `ml` directory (for training or colorizing with pre-trained model). Please refer to `./setup.sh` for a list of commands for setting up the Python virtual environment.

```bash
$ ./ml/setup.sh
```

If you want to play with the pre-trained model, make sure to have `ml/models/model.h5` downloaded.

If you are interested in modifying the model architecture and training a model yourself, see [here](https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#training).

Setup `.env` files in `client` and `server` directories:

```bash
$ cp client/.env.example client/.env
$ cp server/.env.example server/.env
```

The `client` and `server` directories depend on MongoDB and RSA keys. Obtain a [MongoDB URI](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) and [generate RSA keys](https://cryptotools.net/rsagen). Update the `.env` files with the appropriate values.

Once you have the `model.h5` file in `ml/models`, you can run the server and both `.env` files are set up, use the `go` script to run the application:

```bash
$ ./go
```

The `go` script should let you know if you missed one of the steps above, and will promp you to install the necessary dependencies if you haven't already.

### Clientless and Serverless Colorization

You can also use `ml/code/visualize.py` to colorize images without the client and server. Please make sure you have `ml/models/model.h5` downloaded.

```bash
$ cd ../code && python3 visualize.py # -h for help
```

### Flask Colorization

If you're interested in hosting a local, light-weight server for colorizing images, use `ml/code/api.py`. Please make sure you have `ml/models/model.h5` downloaded.

```bash
$ cd ml/code/api.py && python3 api.py
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
| `./setup.sh`                      | View setup commands                    |
| `source venv/bin/activate`        | Activates the virtual environment      |
| `pip install -r requirements.txt` | Installs the ML dependencies           |
| `python3 code/api.py`             | Starts the Flask server                |
| `python3 main.py`                 | Trains the model                       |
| `python3 code/visualize.py -h`    | Commands for visualizing test image(s) |

### Built on MERN+

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=flat-square&logo=flask&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=flat-square&logo=chakraui&logoColor=white)

### Trained on [Places365](http://places.csail.mit.edu/)

![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=flat-square&logo=Keras&logoColor=white) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=flat-square&logo=TensorFlow&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=flat-square&logo=scikit-learn&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=flat-square&logo=Matplotlib&logoColor=black) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=flat-square&logo=numpy&logoColor=white)

### Deployed with [AWS EC2](https://aws.amazon.com/ec2/), [Route 53](https://aws.amazon.com/route53/), and [Pages](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat-square&logo=amazon-aws&logoColor=white) ![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=flat-square&logo=github&logoColor=white)

#### More on API Deployment

The server is deployed on [AWS EC2](https://aws.amazon.com/ec2/). As an extra layer of security, the Flask ML server is hosted _locally_ on the EC2 instance, and can only be accessed through the Express server. The Flask microservice also isolates the ML development from the REST development. As EC2 hosts a virtual machine (Linux for this project), we launched multiple servers and configure the ports through an EC2 security group. This makes it easy to redirect the Express server with Caddy to [api.rgbit](https://api.rgbit.io/api), while making the Flask server inaccessible to the internet. The server runtime is maintained by `systemctl`. If you were interested in hosting your own API as such, check out [my guide](https://johnfarrell.io/writing/aws)!

## Changelog & Todos 📝

- [x] More example gallery images
- [x] Official favicon
- [x] API endpoint for getting total images colorized
- [x] EC2 instance optimiztaion or downgrade
- [x] HEIC/HEIF image upload support
- [x] `https://rgbit.io` only authorized API calls for managing API keys
- [x] Limit API requests by IP address
- [x] Limit file upload size to API
- [x] API endpoint for getting total users
- [x] HEIC image support
- [x] Downscale oversized files

## Acknowledgements

Contributions from Tyler Gurth, John Farrell, Jania Vandevoorde, and Hunter Adrian.

Thank you to Brown University Professor [Srinath Sridhar](https://cs.brown.edu/people/ssrinath/) and Jiahua Chen for advice and insights.

> **Disclaimer:** _When using our [live deployment](https://johnsfarrell.github.io/rgbit/) or [api](https://johnsfarrell.github.io/rgbit#api), you agree to our [terms and conditions](https://johnsfarrell.github.io/rgbit/#tos). This includes storing user uploaded images. If you choose to create your own instance, we do not track your usage. [License](/LICENSE)_.
