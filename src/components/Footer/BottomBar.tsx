import SavePlayListBar from "./SavePlayListBar";
import Score from "./Score";

const BottomBar = () => {
  return (
    <footer className="w-full h-10 flex items-center">
      <div className="inline-flex justify-between items-center h-[75%] w-full">
        <SavePlayListBar />
        <Score />
      </div>
    </footer>
  );
};

export default BottomBar;
