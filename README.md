# RGBIT

[RGBIT](https://johnsfarrell.github.io/rgbit) is a completely open-sourced platform for restoring color to black and white images.

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
