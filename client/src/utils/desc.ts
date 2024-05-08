/**
 * Descriptions for webcontent.
 */

import { AboutLink, AboutProfile } from "../components/about";
import AboutPoster from "../components/about/AboutPoster";

interface ProfileProps {
  name: string;
  src: string;
  bio: string;
  linkedinUrl: string;
}

export const PROFILES: ProfileProps[] = [
  {
    name: "John Farrell",
    src: "img/profiles/john.jpeg",
    bio: "Math & CS @ Brown, 2026",
    linkedinUrl: "https://www.linkedin.com/in/johnsfarrell/",
  },
  {
    name: "Tyler Gurth",
    src: "img/profiles/tyler.jpeg",
    bio: "CS & Art History @ Brown, 2025",
    linkedinUrl: "https://www.linkedin.com/in/tyler-gurth-87249b225/",
  },
  {
    name: "Jania Vandevoorde",
    src: "img/profiles/Jania.jpeg",
    bio: "CS & Stats @ Brown, 2025",
    linkedinUrl: "https://www.linkedin.com/in/jania-vandevoorde/",
  },
  {
    name: "Hunter Adrian",
    src: "img/profiles/hunter.jpeg",
    bio: "CS @ Brown, 2025",
    linkedinUrl: "https://www.linkedin.com/in/hunter-adrian1/",
  },
];

interface ResourceProps {
  title: string;
  description: string;
  src: string;
  href: string;
}

export const RESOURCES: ResourceProps[] = [
  {
    title: "Research Paper",
    description: "CNNs to restore color in gray scale images.",
    src: "img/icons/pdf.png",
    href: "file/report.pdf",
  },
  {
    title: "GitHub Codebase",
    description: "Open-sourced repos (API, CNN, UI/UX).",
    src: "img/icons/github.png",
    href: "https://github.com/",
  },
];

export const POSTERS = [
  {
    src: "research/poster.jpeg",
    alt: "Research Poster",
  },
];

export const BALANCE_DESCRIPTION = "Color restoration on cooldown!";

export const COLOR_DETECTED_IN_IMAGE =
  "Color was already detected in your image. We will restore color to a grayscale version of your image.";

export const GALLERY_TRY_IMAGE = "Try this image!";

export const SERVER_ERROR = "Server error, please try again.";

export const BALANCE_API = `GET https://api.rgbaddies.app/api/user/balance?key=API_KEY
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

export const COLORIZE_API = `POST https://api.rgbaddies.app/api/image/colorize?key=API_KEY
Content-Type: multipart/form-data
Body: { file: File }

Valid Response: {
 ‎ status: 200,
 ‎ remainingBalance: number,
 ‎ refresh: number,
 ‎ message: string,
 ‎ colored: File,
 ‎ redirect: string,
}

Invalid Response: {
 ‎ status: number,
 ‎ message: string,
}`;

export const PAGE_NOT_FOUND = "the page you are looking for does not exist.";

export const API_KEY_BLURB = `Below is your API access key. Please keep it secure and do not share
it. Rate limitations apply similarly to the web interface (5 color
restoration requests per hour). API keys are generated using a unique
device fingerprint. Device fingerprints are encrypted both for user
privacy and to verifying authenticity.`;

export const API_COLORIZE_BLURB = `To restore color to an image, send a POST request to the following
endpoint. The image should be sent as a file in the body of the request.
The response will contain the colorized image as a file.`;

export const API_BALANCE_BLURB = `To check your remaining balance, send a GET request to the following
endpoint. The response will contain the remaining balance. The
countdown is the time remaining until your balance is restored.`;

export const ABOUT_BLURB = `rgbaddies started as a computer vision project at Brown University to
restore color to gray scale images. The project is a completely free
platform for both developers and artists to experiment with colorizing
images. We hope to provide a simple and intuitive interface for users to
upload images and view the results of our colorization deep learning
model.`;

export const TEAM_BLURB = `The rgbaddies team is a group of undergraduate students at Brown
University with a passion for computer vision and machine learning.`;

export const RESEARCH_BLURB = `Our research focused on optimizing a VGG19-based convolutional neural
network to restore color to grayscale images. We trained our model on the MIT Places dataset. A few optimizations we made included 
using a perceptual loss function, skip connections, and augmenting the dataset to be robust against image dimension shifting. 
More specifics about our research can be found on our research poster below!`;

export const COLOR_DECTED_BLURB = `Our model is meant for restoring color to grayscale images.
We detected your uploaded image already has color. Are you sure you would like to continue?`;

export const RESEARCH_TOAST_HEADLINE = "Our Research Poster!";

export const API_KEY_GENERATION_QUESTION = "How are API keys generated?";

export const API_KEY_GENERATION_STEPS = [
  "The user connects to our website.",
  "We first check if the user has an existing API key, saved as a cookie. If the user does not have an API key, we create a new one.",
  "To create an API key, we generate a unique device-browser fingerprint using FingerprintJS. This fingerprint is unique to device and browser, meaning every browser on every device gets its own API key. This fingerprint is then encrypted using MD5 for privacy and security. The encrypted fingerprint is the API key.",
  "The next step is to verify the API key. To verify the API key, we create a signature using RSA-OAEP encryption. We use a client key to encrypt the API key - this is our signature. We then send the API key and signature to the server to be verified.",
  "The server verifies the API key by decrypting the signature using the server key. If the API key and the decrypted signature match, the API key is authentic. Both the client and server keys are kept secret, although the server key could be made public. The client key must remain private, as it is used to sign the API key.",
  "Now that the server has verified the API key, it is stored to our database, and the user is given access to the API.",
];

export const FAQS: { question: string; answer: string[] }[] = [
  {
    question: API_KEY_GENERATION_QUESTION,
    answer: API_KEY_GENERATION_STEPS,
  },
];

export const ABOUT_HEADER = "About RGBaddies";

export const TEAM_HEADER = "Team";

export const RESEARCH_HEADER = "Research";

export const ABOUTS: {
  header: string;
  blurb: string;
  content: any[];
  Component: (props: any) => JSX.Element | null;
}[] = [
  {
    header: ABOUT_HEADER,
    blurb: ABOUT_BLURB,
    content: RESOURCES,
    Component: AboutLink,
  },
  {
    header: TEAM_HEADER,
    blurb: TEAM_BLURB,
    content: PROFILES,
    Component: AboutProfile,
  },
  {
    header: RESEARCH_HEADER,
    blurb: RESEARCH_BLURB,
    content: POSTERS,
    Component: AboutPoster,
  },
];
