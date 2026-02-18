export function minutesToSeconds(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
}


export function getScoreColor (score:number) {
  if(score < 70 ) {
    return "text-red-400"
  }
  if(score < 80) {
    return "text-amber-400"
  }
  if(score < 90) {
    return "text-yellow-400"
  }
  if(score < 95) {
    return "text-green-400"
  }
  return "text-green-600"
}