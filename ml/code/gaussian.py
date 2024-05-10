import tensorflow as tf
"""
Apply gaussian filter to a symbolic tensor.

src: https://stackoverflow.com/a/65219530
"""

def get_gaussian_kernel(shape=(3,3), sigma=0.5):
    m,n = [(ss-1.)/2. for ss in shape]
    x = tf.expand_dims(tf.range(-n,n+1,dtype=tf.float32),1)
    y = tf.expand_dims(tf.range(-m,m+1,dtype=tf.float32),0)
    h = tf.exp(tf.math.divide_no_nan(-((x*x) + (y*y)), 2*sigma*sigma))
    h = tf.math.divide_no_nan(h,tf.reduce_sum(h))
    return h

def gaussian_blur(inp, shape=(3,3), sigma=0.5):
    in_channel = tf.shape(inp)[-1]
    k = get_gaussian_kernel(shape,sigma)
    k = tf.expand_dims(k,axis=-1)
    k = tf.repeat(k,in_channel,axis=-1)
    k = tf.reshape(k, (*shape, in_channel, 1))
    conv = tf.nn.depthwise_conv2d(inp, k, strides=[1,1,1,1],padding="SAME")
    return conv