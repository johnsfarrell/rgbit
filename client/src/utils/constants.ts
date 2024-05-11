interface ItemProps {
  text: string;
  link: string;
}

export const menuItems: ItemProps[] = [
  { text: "home", link: "" },
  { text: "api", link: "api" },
  { text: "about", link: "about" },
];

interface FileTypeProps {
  [key: string]: string[];
}

export const acceptedFileTypes: FileTypeProps = {
  "image/png": [".png"],
  "image/jpg": [".jpg"],
  "image/jpeg": [".jpeg"],
  "image/gif": [".gif"],
  "image/heic": [".heic"],
  "image/webp": [".webp"],
};

export const imgGalleryPath = `${process.env.PUBLIC_URL}/img/gallery/`;

export const imgGalleryFiles: string[] = [
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
];

export const maxFileSize = 3000000;

export const COLORIZE_URI = `${process.env.REACT_APP_API_URL}/image/colorize/`;

export const FETCH_URI = `${process.env.REACT_APP_API_URL}/image/get/`;

export const BALANCE_URI = `${process.env.REACT_APP_API_URL}/user/balance/`;

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
