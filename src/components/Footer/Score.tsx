import { useSpotify } from "../../context/SpotfyContext";
import { getScoreColor } from "../../utils/utilityFns";

const Score = () => {
  const topScoreInSeconds = 2400000;
  const topScore = 100;
  const weeklyTheme= "David Bowie"
  const { totalPlaylistLength, playListTracks} = useSpotify();
  const proximityToTarget = Math.floor(
    (totalPlaylistLength / topScoreInSeconds) * topScore,
  );
  const proximityConverted = (score: number) => {
    if (score <= topScore) {
      return score;
    } else {
      return topScore + (topScore - score);
    }
  };
  const finalScore = proximityConverted(proximityToTarget);

  const themeCount = playListTracks.filter(track => track.trackArtist.includes(weeklyTheme)).length
  const playListTrackLength = playListTracks.length;
  const themeScore = Math.floor(themeCount/playListTrackLength * 100)

  return (
    <div className="inline-flex gap-2">
        <div className="inline-flex justify-center items-center w-fit h-full  gap-1 ">
          <h2 className="font-bold font-[Audiowide] text-[rgb(144,90,144)]">
            Accuracy:
          </h2>
          <h2
            className={`font-bold font-[Audiowide] ${getScoreColor(finalScore)} text-center rounded-2xl bg-[rgba(238,184,239,0.5)] px-2`}
          >
            {proximityToTarget === 0 ? "---" : finalScore}
          </h2>
        </div>
            <div className="inline-flex justify-center items-center w-fit h-full  gap-1 ">
          <h2 className="font-bold font-[Audiowide] text-[rgb(144,90,144)]">
            Theme:
          </h2>
          <h2
            className={`font-bold font-[Audiowide] ${getScoreColor(themeScore)} text-center rounded-2xl bg-[rgba(238,184,239,0.5)] px-2`}
          >
            {themeScore}
          </h2>
        </div>
    </div>
  );
};

export default Score;
