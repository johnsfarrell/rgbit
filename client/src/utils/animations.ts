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
 * Animation to fade in the color of the image.
 */
export const COLOR_FADE_IN = `${keyframes`
    from {
      filter: grayscale(100%);
    }
    to {
      filter: none;
    }
  `} 3s ease`;

/**
 * Animation to rotate the hue of the text.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate}
 * @src {@link https://webflow.com/made-in-webflow/website/major-animated-gradient-text-1}
 */
export const HUE_ROTATE = `${keyframes`
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(-360deg); }
    2s infinite linear
  `}`;

/**
 * Hover animation, mostly for buttons.
 */
export const ACTIVE_HOVER = {
  transform: "scale(1.075)",
  letterSpacing: "-0.75px",
  filter: "brightness(0.95)",
};

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
