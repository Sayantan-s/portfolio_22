import { Button, Heading } from "@components/ui";
import { Activity } from "@store/types/posts";

interface IChooseActivityProps {
  onChoose: (activity: Activity) => void;
}
export const ChooseActivity = ({ onChoose }: IChooseActivityProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* <h1 className="mb-10 text-3xl font-bold text-slate-700">
        Choose your next gig!
      </h1> */}
      <Heading level={"2"} weight={"semibold"} className="text-slate-700 mb-10">
        Choose your next gig!
      </Heading>
      <div className="flex items-center justify-center space-x-3">
        <Button onClick={() => onChoose("sell")} size="xl">
          Sell
        </Button>
        <Button
          variant={"teal-secondary"}
          size="xl"
          onClick={() => onChoose("promote")}
        >
          Promote
        </Button>
      </div>
    </div>
  );
};
