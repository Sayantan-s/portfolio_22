import { Activity } from "@store/types/posts";

interface IChooseActivityProps {
  onChoose: (activity: Activity) => void;
}
export const ChooseActivity = ({ onChoose }: IChooseActivityProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 h-full w-full">
      <button
        onClick={() => onChoose("promote")}
        className="w-40 text-white font-normal px-6 py-3 rounded-full flex items-center justify-center bg-teal-500 highlight-white/20 hover:bg-teal-400"
      >
        Promote
      </button>
      <span>or</span>
      <button
        onClick={() => onChoose("sell")}
        className="w-40 text-white font-normal px-6 py-3 rounded-full flex items-center justify-center bg-sky-500 highlight-white/20 hover:bg-sky-400"
      >
        Sell
      </button>
    </div>
  );
};
