import { Button } from "@components/ui";
import { TCreatePost } from "@store/types/posts";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  ArrowLeft2,
  AttachCircle,
  Happyemoji,
  Image,
  Trash,
} from "iconsax-react";
import React, { useMemo } from "react";
import { EditorControls } from "./EditorControls";

type IFillSchemaInfoProps = Pick<TCreatePost, "activity"> & {
  onPost: () => void;
  onChangeHeading: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBody: (props: EditorEvents["update"]) => void;
  onBack?: () => void;
};

const FillPostInfo = ({
  activity,
  onPost,
  onChangeHeading,
  onChangeBody,
  onBack,
}: IFillSchemaInfoProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      Text,
      Color,
      TextStyle,
      CharacterCount.configure({
        limit: 700,
      }),
      Placeholder.configure({
        placeholder:
          "ejemplo: a programmer may know that she needs a certain number of values or variables, but doesn't yet know what to input!",
        emptyNodeClass: "text-slate-500/20",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none w-full p-2 text-3xl font-semibold",
      },
    },
    onUpdate: onChangeBody,
  });

  const handlePost = async () => {
    await onPost();
    editor?.commands.setContent("");
  };

  const colors = useMemo<string[]>(() => {
    const slate = [
      "rgb(209 213 219)",
      "rgb(156 163 175)",
      "rgb(75 85 99",
      "rgb(31 41 55)",
    ];
    const teal = [
      "rgb(153 246 228)",
      "rgb(94 234 212)",
      "rgb(45 212 191)",
      "rgb(20 184 166)",
    ];
    const sky = [
      "rgb(186 230 253)",
      "rgb(125 211 252)",
      "rgb(56 189 248)",
      "rgb(14 165 233)",
    ];
    activity === "promote" ? slate.push(...teal) : slate.push(...sky);
    return slate;
  }, []);

  const memoizedEditor = useMemo(() => {
    return (
      <React.Fragment>
        {editor && <EditorControls editor={editor} colors={colors} />}
        <EditorContent editor={editor} />
      </React.Fragment>
    );
  }, [editor]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between">
          <button
            className="p-1.5 rounded-full bg-slate-50 hover:bg-slate-100"
            onClick={onBack}
          >
            <ArrowLeft2
              variant="Broken"
              className="w-5 h-5"
              color="rgb(148 163 184)"
            />
          </button>
          <div className="space-x-1 flex items-center justify-end">
            <button className="rounded-xl p-1">
              <Image
                className="w-6 h-6"
                color="rgb(148 163 184)"
                variant="Bulk"
              />
            </button>
            <button className="rounded-xl p-1">
              <AttachCircle
                className="w-6 h-6"
                color="rgb(148 163 184)"
                variant="Broken"
              />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <input
            maxLength={40}
            type="text"
            className="focus:outline-none w-full p-2 text-3xl font-semibold text-slate-700 placeholder:text-slate-500/40"
            placeholder={
              activity === "promote"
                ? "What's cooking?!!!"
                : "New Dollars $oon!!!"
            }
            onChange={onChangeHeading}
          />
          {memoizedEditor}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-2 flex items-center">
          <button className="bg-sky-100/70 rounded-xl p-2 hover:bg-sky-200/70">
            <Happyemoji
              className="w-6 h-6"
              color="rgb(14 165 233)"
              variant="Bulk"
            />
          </button>
          <button className="bg-red-100/70 rounded-xl p-2 hover:bg-red-200/70">
            <Trash
              className="w-6 h-6"
              color="rgb(248 113 113)"
              variant="Bulk"
            />
          </button>
        </div>
        <Button onClick={handlePost} variant="gradient" size="lg">
          Shoot
        </Button>
      </div>
    </div>
  );
};

export default FillPostInfo;
