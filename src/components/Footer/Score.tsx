import { useSpotify } from "../../context/SpotfyContext";


const Score = () => {
    const idealScore= 2400000;
    const {totalPlaylistLength} =useSpotify()
    const proximityToTarget = Math.floor(totalPlaylistLength/idealScore * 100)
    const proximityConverted = (score:number) => {
        if(score<=100) {
            return score
        } else {
            return 100 + (100-score);
        }
    }

  return (
    <div className="inline-flex justify-center items-center w-fit h-full  gap-1 ">
      <h2 className="font-bold font-[Audiowide] text-[rgb(144,90,144)]">
        Score:
      </h2>
      <h2 className="font-bold font-[Audiowide] text-center text-[rgb(3,110,12)] rounded-2xl bg-[rgba(238,184,239,0.5)] px-2">
        {proximityToTarget === 0 ? "--" : proximityConverted(proximityToTarget)}
      </h2>
    </div>
  );
};

export default Score;
