import { Button } from "@components/ui";
import React, { Reducer, useReducer } from "react";
import Tool from "./Tool";

export const PostTool = () => {
  const [show, showToggler] = useReducer<Reducer<boolean, "show" | "hide">>(
    (_, action) =>
      action === "show" ? true : action === "hide" ? false : false,
    false
  );

  return (
    <React.Fragment>
      <div className="px-4" onClick={() => showToggler("show")}>
        <div className="bg-slate-100 rounded-xl overflow-hidden">
          <textarea
            placeholder="Hey what's cooking!!"
            className="w-full h-full resize-none bg-transparent p-3 placeholder:text-slate-300 focus:outline-none"
            rows={1}
          />
          <div className="p-3 flex justify-between">
            <div />
            <Button variant={"gradient"}>Shoot</Button>
          </div>
        </div>
      </div>
      {show && (
        <Tool
          onRemove={() => {
            showToggler("hide");
          }}
        />
      )}
    </React.Fragment>
  );
};
