import { keyframes } from "@emotion/react";

/**
 * Animation to open and close the ResearchToast.
 */
export const OPEN_CLOSE = `${keyframes`
      0%, 100% {
        top: -20vh;
      }
      5%, 95% {
        top: 6px;
      }
    `} 8s ease forwards 1s`;

/**
 * Animation to rotate the hue of the text.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate}
 * @src {@link https://webflow.com/made-in-webflow/website/major-animated-gradient-text-1}
 */
export const HUE_ROTATE = `${keyframes`
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(-360deg); }
  `} 5s linear infinite`;

/**
 * Hover animation, mostly for buttons.
 */
export const ACTIVE_HOVER = {
  transform: "scale(1.075)",
  letterSpacing: "-0.75px",
  filter: "brightness(0.95)"
};

/**
 * Animation to fade in the black and white of the image.
 */
export const IMAGE_VIEW_OPEN = `${keyframes`
    from {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1.05);
    }
  `} 0.5s ease`;

/**
 * Animation to open the gallery.
 */
export const GALLERY_OPEN = `${keyframes`
    from { opacity: 0; scale: 0.9; }
  `} 1s ease`;

/**
 * Animation to open the gallery actions.
 */
export const GALLERY_ACTIONS_OPEN = `${keyframes`
    from { bottom: -20vh }
  `} 1s ease`;

/**
 * Animation for gallery scroll.
 */
export const GALLERY_SCROLL = `${keyframes`
    from { transform: translateX(-25%) }
    to { transform: translateX(25%) }
  `} 100s linear infinite`;
