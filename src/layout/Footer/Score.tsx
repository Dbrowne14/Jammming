import { useSpotify } from "../../context/SpotfyContext";
import {
  getScoreColor,
  calculateBaseTopScore,
  numToZero,
} from "../../utils/utilityFns";
import { ScoringData } from "../../data/scoringParameters";

const Score = () => {
  const { topScore, topScoreInSeconds, weeklyTheme, playListDesiredLength } =
    ScoringData;
  const { totalPlaylistLength, playListTracks, totalPlayListTrackLength } =
    useSpotify();

  const accuracyScore = calculateBaseTopScore(
    totalPlaylistLength,
    topScoreInSeconds,
    topScore,
  );
  const playListScore = calculateBaseTopScore(
    totalPlayListTrackLength,
    playListDesiredLength,
    topScore,
  );

  const calculateThemeScore = () => {
    const themesInPlaylist = playListTracks.filter((track) =>
      track.trackArtist.includes(weeklyTheme),
    ).length;
    return calculateBaseTopScore(
      themesInPlaylist,
      playListDesiredLength,
      topScore,
    );
  };

  const themeScore = numToZero(totalPlayListTrackLength, calculateThemeScore);

  const scores = [
    { name: "Theme", result: themeScore },
    { name: "Accuracy", result: accuracyScore },
    { name: "Tracks", result: playListScore },
  ];

  const totalScore = Math.floor(
    (accuracyScore + playListScore + themeScore) / scores.length,
  );

  return (
    <div className="inline-flex gap-6 md:border-[0.5px] md:border-[rgba(1,1,1,0.2)] shadow-2xl rounded-2xl md:p-2">
      <div className="hidden md:flex flex-col font-bold items-end gap-1 text-[0.8rem]">
        {scores.map((score, index) => {
          return (
            <div
              className="inline-flex  justify-center items-center w-fit h-full  gap-1 "
              key={index}
            >
              <h2 className=" text-[rgb(144,90,144)]">{score.name}</h2>
              <h2
                className={`  ${getScoreColor(score.result)} text-center rounded-2xl bg-[rgba(238,184,239,0.5)] px-2 w-10`}
              >
                {score.result === 0 ? "--" : score.result}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="text-[1rem] ">
        <div className="flex flex-col px-2  md:pr-4 text-[1.3rem]  justify-center items-center w-fit h-full  gap-1 ">
          <h2 className=" font-[Audiowide] hidden md:block text-[rgb(144,90,144)]">
            Score
          </h2>
          <h2
            className={`font-bold font-[Audiowide]  ${getScoreColor(totalScore)} text-center rounded-2xl bg-[rgba(238,184,239,0.5)] px-2 shadow-2xl `}
          >
            {totalScore === 0 ? "--" : totalScore}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Score;
