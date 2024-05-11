# [RGBIT.io](https://johnsfarrell.github.io/rgbit)

![rgbit-banner](https://github.com/johnsfarrell/rgbit/assets/69059806/296c18cd-892d-4507-817a-dbd45f3ee2e0)

[![pages-build-deployment](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/johnsfarrell/rgbit/actions/workflows/pages/pages-build-deployment) 
<a target="_blank" href="https://colab.research.google.com/github/johnsfarrell/rgbit/blob/main/ml/code/rgbit.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

RGBIT is a completely open-source and free platform for restoring color to black and white images. 

<hr>

## Resources

- [Website](https://johnsfarrell.github.io/rgbit)
- [API Documentation](https://johnsfarrell.github.io/rgbit#api)
- [Codebase](https://github.com/johnsfarrell/rgbit)
- [Research Paper](https://johnsfarrell.github.io/rgbit/research.pdf), [Poster](https://johnsfarrell.github.io/rgbit/poster.pdf)

## Installation

Clone the repository:

```bash
$ git clone https://github.com/johnsfarrell/rgbit
```

If you want to play with the pre-trained model, navigate to `ml/models` and run `download.sh`:

```bash
$ cd ml/models && ./download.sh
```

Setup `.env` files in `client` and `server` directories:

```bash
$ cp client/.env.example client/.env
$ cp server/.env.example server/.env
```

The `client` and `server` directories depend on MongoDB and RSA keys. Obtain a [MongoDB URI](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial) and [generate RSI keys](https://www.ssh.com/ssh/keygen/). Update the `.env` files with the appropriate values.

Once you have the `model.h5` file in `ml/models`, you can run the server and both `.env` files are set up, use the `run` script to run the application:

```bash
$ ./run
```

The `run` script should let you know if you missed one of the steps above, and will promp you to install the necessary dependencies if you haven't already.

You can also use `ml/code/visualize.py` to colorize images without the client and server. Please make sure you have `ml/models/model.h5` downloaded. Specify an image (path) to color at the bottom of `ml/code/visualize.py`.

## Usage

Navigate to `http://localhost:3000` to use the application.

The API is available at `http://localhost:4004`.

The colorize endpoint is available at `http://localhost:4004/colorize`.

## Training

If you would like to train your own model, use the `ml` directory. You can download the dataset using the `download.sh` script in the `ml/data` directory:

```bash
$ cd ml/data && ./download.sh
```

Once you have the dataset, you can train the model using the `main.py` script in the `ml/code` directory:

```bash
$ cd ml/code && python main.py
```

You can configure the model, change hyperparameters, and modify preprocessing and augmentation in the `ml/code/model.py`, `ml/code/hyperparameters.py`, and `ml/code/preprocess.py` files, respectively.

### Built on MERN+

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

### Trained on [365 Places](http://places.csail.mit.edu/)

![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

> **Disclaimer:** *When using our [live deployment](https://johnsfarrell.github.io/rgbit/) or [api](https://johnsfarrell.github.io/rgbit#api), you agree to our [terms and conditions](https://johnsfarrell.github.io/rgbit/#tos). This includes storing user uploaded images. If you choose to create your own instance, we do not track your usage.*

