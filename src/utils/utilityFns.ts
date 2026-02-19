export function minutesToSeconds(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
}

export function getScoreColor(score: number) {
  if (score < 70) {
    return "text-[rgb(198,86,86)]";
  }
  if (score < 80) {
    return "text-amber-400";
  }
  if (score < 90) {
    return "text-[rgb(206,201,129)]";
  }
  if (score < 95) {
    return "text-[rgb(98,164,102)]";
  }
  return "text-green-600";
}

export const calculateBaseTopScore = (
  scoreMetric: number,
  topScoreMetric: number,
  topScore: number,
) => {
  const score = Math.floor((scoreMetric / topScoreMetric) * topScore);

  if (score <= topScore) {
    return score;
  } else {
    return topScore + (topScore - score);
  }
};

export const numToZero = (
  lengthParam: number,
  finalScore: number | (() => number),
): number => {
  if (lengthParam === 0) return 0;

  return typeof finalScore === "function" ? finalScore() : finalScore;
};
