/**
 * Converts milliseconds to MM:SS format.
 * @param milliseconds The time in milliseconds.
 * @returns {string} The time in MM:SS format.
 */
export const millisecondsToMMSS = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
