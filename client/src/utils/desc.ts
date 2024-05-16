/**
 * Descriptions for webcontent.
 */

export const TERMS_AND_CONDITIONS = [
  {
    heading: "Terms and Conditions",
    text: `Welcome to RGBIT Website! By accessing or using our website or using our API service, you agree to be bound by these terms and conditions.`,
    list: [],
  },
  {
    heading: "Acceptance of Terms",
    text: `By submitting images, uploading images, and restoring color to images, you acknowledge and agree to these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website and API service.`,
    list: [],
  },
  {
    heading: "User Submitted Images",
    text: `Users are permitted to upload digital images to our platform. The images you upload may be viewed by other users of this site and used in accordance with the following terms:`,
    list: [
      `Users retain ownership of the images they upload but grant us, RGBIT, a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute their images in any existing or future media.`,
      `You warrant and represent that the images do not infringe on any third party's rights (including intellectual property rights) and that they comply with all applicable laws and regulations.`,
      `You are responsible for any claims brought against us, RGBIT, arising out of or related to the images you submit.`,
    ],
  },
  {
    heading: "Acceptance of Terms",
    text: `The images you upload will be stored on our servers as part of our service offering. While we endeavor to ensure the security of all data, we cannot guarantee the complete security of data sent over the internet.`,
    list: [],
  },
  {
    heading: "Sharing of Images",
    text: `The images you upload may be shared with other users of this site. By using this website, you agree to the sharing of your images with other users.`,
    list: [],
  },
  {
    heading: "Amendments",
    text: `We reserve the right to amend these terms and conditions at any time. Amendments will be effective immediately upon posting on this website. Your continued use of this website will constitute your acceptance of the amended terms and conditions.`,
    list: [],
  },
  {
    heading: "Limitation of Liability",
    text: `We will not be liable to you (whether under the law of contract, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:`,
    list: [
      `for any direct loss;`,
      `for any indirect, special or consequential loss; or`,
      `for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.`,
    ],
  },
  {
    heading: "Contact Us",
    text: `If you have any questions about these terms and conditions, please contact us. john_farrell@brown.edu`,
    list: [],
  },
];

export const TOTAL_USERS_DESCRIPTION = (count: number | undefined) =>
  `${count || "Total"} API keys distributed.`;

export const BALANCE_DESCRIPTION = "Color restoration on cooldown!";

export const COLOR_DETECTED_IN_IMAGE =
  "Color was already detected in your image. We will restore color to a grayscale version of your image.";

export const GALLERY_TRY_IMAGE = "Try this image!";

export const SERVER_ERROR = "Server error, please try again.";

export const BALANCE_API = `GET https://api.rgbit.io/api/user/balance/:api_key
Content-Type: application/json
Body: None

Valid Response: { 
 ‎  status: 200, 
 ‎  balance: number, 
 ‎  refresh: number, 
 ‎  message: string,
}

Invalid Response: {
‎  status: number,
‎  message: string,
}`;

export const COLORIZE_API = `POST https://api.rgbit.io/api/image/colorize/:api_key
Content-Type: multipart/form-data
Body: { image: File }

Valid Response: {
 ‎ status: 200,
 ‎ remainingBalance: number,
 ‎ refresh: number,
 ‎ message: string,
 ‎ download: string,
 ‎ redirect: string,
}

Invalid Response: {
 ‎ status: number,
 ‎ message: string,
}`;

export const IMAGE_API = `POST https://api.rgbit.io/api/image/get/:image_id
Content-Type: multipart/form-data
Body: None

Valid Response: {
 ‎ status: 200,
 ‎ message: string,
 ‎ colored: Buffer,
}

Invalid Response: {
 ‎ status: number,
 ‎ message: string,
}`;

export const PAGE_NOT_FOUND = "the page you are looking for does not exist.";

export const API_KEY_BLURB = `Below is your API access key. Please keep it secure and do not share
it. Rate limitations apply similarly to the web interface. API keys are generated using a unique
device fingerprint. Device fingerprints are encrypted both for user
privacy and to verifying authenticity.`;

export const API_COLORIZE_BLURB = `To restore color to an image, send a POST request to the following
endpoint. The image should be sent as a file in the body of the request.
The response will contain a redirect to view the image on our site and a download buffer link.
The refresh is the time remaining until your balance is restored.`;

export const API_BALANCE_BLURB = `To check your remaining balance, send a GET request to the following
endpoint. The response will contain the remaining balance. The
refresh is the time remaining until your balance is restored.`;

export const API_IMAGE_BLURB = `To retrieve a colorized image, send a POST request to the following
endpoint. The response will contain the colorized image as a buffer. Keep in mind that the we only
temporarily store images, so be sure to save the image after retrieving it.`;

export const ABOUT_BLURB = `RGBIT started as a computer vision project at Brown University to
restore color to gray scale images. The project is a completely free
platform for both developers and artists to experiment with colorizing
images. We hope to provide a simple and intuitive interface for users to
upload images and view the results of our colorization deep learning
model.`;

export const TEAM_BLURB = `Our contributors are undergraduate students at Brown
University with a passion for computer vision and machine learning.`;

export const RESEARCH_BLURB = `Our research focused on optimizing a VGG19-based convolutional neural
network to restore color to grayscale images. We trained our model on the MIT Places dataset. A few optimizations we made included 
using a perceptual loss function, skip connections, and augmenting the dataset to be robust against image dimension shifting. 
More specifics about our research can be found on our research poster below!`;

export const COLOR_DECTED_BLURB = `Our model is meant for restoring color to grayscale images.
We detected your uploaded image already has color. Are you sure you would like to continue?`;

export const RESEARCH_TOAST_HEADLINE = "Our Research!";

export const API_KEY_HEADER = "Your API Key";

export const API_DOCUMENTATION_HEADER = "Documentation";

export const API_FAQ_HEADER = "Frequently Asked Questions";

export const API_KEY_GENERATION_QUESTION = "How are API keys generated?";

export const API_KEY_GENERATION_STEPS = [
  "The user connects to our website.",
  "We first check if the user has an existing API key, saved as a cookie. If the user does not have an API key, we create a new one.",
  "To create an API key, we generate a unique device-browser fingerprint using FingerprintJS. This fingerprint is unique to device and browser, meaning every browser on every device gets its own API key. This fingerprint is then encrypted using MD5 for privacy and security. The encrypted fingerprint is the API key.",
  "The next step is to verify the API key. To verify the API key, we create a signature using RSA-OAEP encryption. We use a client key to encrypt the API key - this is our signature. We then send the API key and signature to the server to be verified.",
  "The server verifies the API key by decrypting the signature using the server key. If the API key and the decrypted signature match, the API key is authentic. Both the client and server keys are kept secret, although the server key could be made public. The client key must remain private, as it is used to sign the API key.",
  "Now that the server has verified the API key, it is stored to our database, and the user is given access to the API.",
];

export const PHOTO_PROCESSING_QUESTION = "How are user photos processed?";

export const PHOTO_PROCESSING_STEPS = [
  "The user uploads an image to our website, and the image and user API key are sent to the server for processing.",
  "The server checks the user's balance to ensure they have enough credits to process the image. If the user does not exist, or there are not enough credits, the server returns an 40x response.",
  "The server downsizes the image to 224x224 pixels and converts it to grayscale. We create a 1x224x224 tensor from the image.",
  "The 1x224x224 tensor is fed to our model, which outputs a 2x224x224 tensor. This tensor represents the ab channels of the image.",
  "The 1x224x224 L channel (input) is concatenated with the 2x224x224 ab channels to create a 3x224x224 tensor.",
  "The 3x224x224 tensor (in LAB color space format) is then upscaled to the original image size.",
  "The original image L channel is concatenated with the upscaled ab channels to create a 3xWxH tensor, where W and H are the width and height of the original image.",
  "The 3xWxH tensor is converted to RGB format and saved to our database, cloud hosted on MongoDB.",
  "The server returns a redirect to the user, who can view the colorized image. The user's balance is decremented by one.",
];

export const FAQS: { question: string; answer: string[] }[] = [
  {
    question: API_KEY_GENERATION_QUESTION,
    answer: API_KEY_GENERATION_STEPS,
  },
  {
    question: PHOTO_PROCESSING_QUESTION,
    answer: PHOTO_PROCESSING_STEPS,
  },
];

export const NO_API_KEY = "No API key found.";

export const FAILED_FETCH_BALANCE = "Failed to fetch balance.";

export const FAILED_VERIFY_SIGNATURE = "Failed to verify signature.";

export const FAILED_FETCH_IMAGE = "Failed to fetch image.";

export const API_DOCUMENTATION_CONTENT = [
  {
    heading: "Colorize",
    text: API_COLORIZE_BLURB,
    code: COLORIZE_API,
  },
  {
    heading: "Balance",
    text: API_BALANCE_BLURB,
    code: BALANCE_API,
  },
  {
    heading: "Image",
    text: API_IMAGE_BLURB,
    code: IMAGE_API,
  },
];
