import keras
from keras.layers import \
     concatenate, Conv2DTranspose, Rescaling, BatchNormalization
from keras.applications import VGG19
from keras.layers import LeakyReLU
import hyperparameters as hp
from keras.losses import mean_squared_error as mse
from gaussian import gaussian_blur as blur

class Model():
    def __init__(self):
        
        inp = keras.Input(shape=(hp.img_size, hp.img_size, 3))
        
        vgg19 = VGG19(
            include_top=False,
            weights="imagenet",
            input_shape=(hp.img_size, hp.img_size, 3),
            input_tensor = inp
        )

        for layer in vgg19.layers:
            layer.trainable = False

        """
        Model: "vgg19"
        _________________________________________________________________
        Layer (type)                Output Shape              Param #   
        =================================================================
        input_1 (InputLayer)        [(None, 224, 224, 3)]     0         
                                                                        
        block1_conv1 (Conv2D)       (None, 224, 224, 64)      1792      
                                                                        
        block1_conv2 (Conv2D)       (None, 224, 224, 64)      36928     
                                                                        
        block1_pool (MaxPooling2D)  (None, 112, 112, 64)      0         
                                                                        
        block2_conv1 (Conv2D)       (None, 112, 112, 128)     73856     
                                                                        
        block2_conv2 (Conv2D)       (None, 112, 112, 128)     147584    
                                                                        
        block2_pool (MaxPooling2D)  (None, 56, 56, 128)       0         
                                                                        
        block3_conv1 (Conv2D)       (None, 56, 56, 256)       295168    
                                                                        
        block3_conv2 (Conv2D)       (None, 56, 56, 256)       590080    
                                                                        
        block3_conv3 (Conv2D)       (None, 56, 56, 256)       590080    
                                                                        
        block3_conv4 (Conv2D)       (None, 56, 56, 256)       590080    
                                                                        
        block3_pool (MaxPooling2D)  (None, 28, 28, 256)       0         
                                                                        
        block4_conv1 (Conv2D)       (None, 28, 28, 512)       1180160   
                                                                        
        block4_conv2 (Conv2D)       (None, 28, 28, 512)       2359808   
                                                                        
        block4_conv3 (Conv2D)       (None, 28, 28, 512)       2359808   
                                                                        
        block4_conv4 (Conv2D)       (None, 28, 28, 512)       2359808   
                                                                        
        block4_pool (MaxPooling2D)  (None, 14, 14, 512)       0         
                                                                        
        block5_conv1 (Conv2D)       (None, 14, 14, 512)       2359808   
                                                                        
        block5_conv2 (Conv2D)       (None, 14, 14, 512)       2359808   
                                                                        
        block5_conv3 (Conv2D)       (None, 14, 14, 512)       2359808   
                                                                        
        block5_conv4 (Conv2D)       (None, 14, 14, 512)       2359808   
                                                                        
        block5_pool (MaxPooling2D)  (None, 7, 7, 512)         0         
                                                                        
        flatten (Flatten)           (None, 25088)             0         
                                                                        
        fc1 (Dense)                 (None, 4096)              102764544 
                                                                        
        fc2 (Dense)                 (None, 4096)              16781312  
                                                                        
        predictions (Dense)         (None, 1000)              4097000   
                                                                        
        =================================================================
        """
        self.mod = vgg19.output
        b = Conv2DTranspose(filters=512, kernel_size=3, strides=2, activation=None, padding="same")(self.mod)
        b = LeakyReLU(alpha=0.1)(b)
        b = BatchNormalization()(b)
        self.mod = concatenate([b, vgg19.get_layer("block5_conv4").output])

        block_layer_sizes = [
            (512, "block4_conv4"),
            (256, "block3_conv4"),
            (128, "block2_conv2"),
            (64, "block1_conv2")
        ]

        for filters, layer_name in block_layer_sizes:
            b = Conv2DTranspose(filters=filters, kernel_size=3, strides=1, activation=None, padding="same")(self.mod)
            b = LeakyReLU(alpha=0.1)(b)
            b = BatchNormalization()(b)
            b = Conv2DTranspose(filters=filters, kernel_size=3, strides=2, activation=None, padding="same")(b)
            b = LeakyReLU(alpha=0.1)(b)
            b = BatchNormalization()(b)
           
            self.mod = concatenate([b, vgg19.get_layer(layer_name).output])

        self.mod = Conv2DTranspose(64, 3, activation=None, padding="same")(self.mod)
        self.mod = LeakyReLU(alpha=0.1)(self.mod)
        self.mod = BatchNormalization()(self.mod)
        self.mod = Conv2DTranspose(2, 3, activation="sigmoid", padding="same")(self.mod)
        self.mod = Rescaling(scale=255.0, offset=-128)(self.mod)
        self.mod = keras.Model(inputs=inp, outputs=self.mod)
   
    def percept_loss_func(self, truth, predicted):
        truth_blur_3 = blur(truth, (3,3))
        truth_blur_5 = blur(truth, (5,5))

        predicted_blur_3 = blur(predicted, (3,3))
        predicted_blur_5 = blur(predicted, (5,5))

        dist = mse(truth, predicted) ** 0.5
        dist_3 = mse(truth_blur_3, predicted_blur_3) ** 0.5
        dist_5 = mse(truth_blur_5, predicted_blur_5) ** 0.5
        
        return (dist + dist_3 + dist_5) / 3
