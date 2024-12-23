interface FileTypeProps {
  [key: string]: string[];
}

export const ACCEPTED_FILE_TYPES: FileTypeProps = {
  "image/png": [".png"],
  "image/jpg": [".jpg"],
  "image/jpeg": [".jpeg"],
  "image/gif": [".gif"],
  "image/heic": [".heic"],
  "image/avif": [".avif"],
  "image/heif": [".heif"],
  "image/webp": [".webp"],
  "image/bmp": [".bmp"]
};

export const RESEARCH_PATH = `${process.env.PUBLIC_URL}/research/`;

export const PROFILES_PATH = `${process.env.PUBLIC_URL}/img/profiles/`;

export const ICON_PATH = `${process.env.PUBLIC_URL}/img/icons/`;

export const GALLERY_PATH = `${process.env.PUBLIC_URL}/img/gallery/`;

export const GALLERY_IMAGES: string[] = [
  "sailor.jpeg",
  "jfk.jpeg",
  "painting.jpeg",
  "nightvision.jpeg",
  "monroe.jpeg",
  "movie.jpg",
  "movie-2.jpg",
  "einstein.jpeg",
  "ali.webp",
  "valley.jpg",
  "mermaid.webp"
].map(img => `${GALLERY_PATH}${img}`);

export const MAX_FILE_SIZE = 5000000; // 5MB

export const FILE_RESIZE = 600000; // 600KB

export const COLORIZE_URI = `${process.env.REACT_APP_API_URL}/image/colorize/`;

export const FETCH_URI = `${process.env.REACT_APP_API_URL}/image/get/`;

export const BALANCE_URI = `${process.env.REACT_APP_API_URL}/user/balance/`;

export interface Injection {
  file: File | undefined;
  setFile: (file: File | undefined) => Promise<boolean>;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export interface Props {
  props: Injection;
}

export const GITHUB_URL = "https://github.com/johnsfarrell/rgbit";

export const PORTFOLIO_URL = "https://johnfarrell.io";

interface ItemProps {
  text: string;
  link: string;
}

export const MENU_ITEMS: ItemProps[] = [
  { text: "home", link: "/" },
  { text: "api", link: "#api" },
  { text: "report", link: RESEARCH_PATH + "report.pdf" },
  { text: "github", link: GITHUB_URL }
];
