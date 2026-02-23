import SavePlayListBar from "./SavePlayListBar";
import Score from "./Score";

const BottomBar = () => {
  return (
    <footer className="w-full m-h-10 flex h-fit items-cente my-[1%]">
      <div className="inline-flex justify-between items-center h-[75%] w-full text-[0.9rem]">
        <SavePlayListBar />
        <Score />
      </div>
    </footer>
  );
};

export default BottomBar;
