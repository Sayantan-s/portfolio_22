import { Heading } from "@/components/ui";
import { useWebS } from "@/context/Ws";
import { useUser } from "@/hooks";
import * as Popover from "@radix-ui/react-popover";

export const ProfilePopper = () => {
  const user = useUser();

  const { isConnected } = useWebS();

  const connectedStyles = isConnected ? "bg-emerald-300" : "bg-rose-400";

  return (
    <div className="absolute bottom-4 w-48 left-1/2 transform -translate-x-1/2 bg-slate-50 hover:bg-slate-100 p-2 rounded-full">
      <Popover.Root
        onOpenChange={(d) => {
          console.log(d);
        }}
      >
        <Popover.Trigger className="w-full flex items-center truncate">
          <div className="w-10 h-10 bg-slate-200 rounded-full relative">
            <img
              src={user?.details?.profile_pic}
              className="absolute w-full h-full object-cover object-center"
            />
          </div>
          <div className="text-left w-1/2 ml-3">
            <Heading className="text-slate-700 text-sm" level={"6"}>
              {user?.details?.first_name}
            </Heading>
            <div className="text-xs flex items-center">
              Status{" "}
              <div
                className={`w-2 h-2 rounded-full ml-1.5 ${connectedStyles}`}
              ></div>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={20}
            className="bg-white w-full h-full border shadow-sm flex flex-col"
          >
            <button>Darkmode</button>
            <button>Logout</button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
