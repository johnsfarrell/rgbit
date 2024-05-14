interface ItemProps {
  text: string;
  link: string;
}

export const MENU_ITEMS: ItemProps[] = [
  { text: "home", link: "#" },
  { text: "api", link: "#api" },
  {
    text: "more ↗",
    link: "https://github.com/johnsfarrell/rgbit?tab=readme-ov-file#rgbitio",
  },
];

interface FileTypeProps {
  [key: string]: string[];
}

export const ACCEPTED_FILE_TYPES: FileTypeProps = {
  "image/png": [".png"],
  "image/jpg": [".jpg"],
  "image/jpeg": [".jpeg"],
  "image/gif": [".gif"],
  "image/heic": [".heic"],
  "image/webp": [".webp"],
};

export const RESEARCH_PATH = `${process.env.PUBLIC_URL}/research/`;

export const PROFILES_PATH = `${process.env.PUBLIC_URL}/img/profiles/`;

export const ICON_PATH = `${process.env.PUBLIC_URL}/img/icons/`;

export const GALLERY_PATH = `${process.env.PUBLIC_URL}/img/gallery/`;

export const GALLERY_IMAGES: string[] = [
  "sailor.png",
  "jfk.png",
  "landscape.png",
  "garry.jpg",
  "mona.png",
  "gothic.jpg",
  "ap.jpeg",
  "louvre.jpg",
  "painting.jpg",
  "nightvision.jpg",
].map((img) => `${GALLERY_PATH}${img}`);

export const MAX_FILE_SIZE = 3000000;

export const COLORIZE_URI = `${process.env.REACT_APP_API_URL}/image/colorize/`;

export const FETCH_URI = `${process.env.REACT_APP_API_URL}/image/get/`;

export const BALANCE_URI = `${process.env.REACT_APP_API_URL}/user/balance/`;

export const REPORT_PATH = `${RESEARCH_PATH}report.pdf`;

export const POSTER_PATH = `${RESEARCH_PATH}poster.pdf`;

export interface Injection {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  onOpen: () => void;
  setHasColor: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  onClose: () => void;
  isOpen: boolean;
  hasColor: boolean | undefined;
}

export interface Props {
  props: Injection;
}
