import { TCreatePost } from "@store/types/posts";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useMemo } from "react";
import { EditorControls } from "./EditorControls";

type IFillSchemaInfoProps = Pick<TCreatePost, "activity"> & {
  onPost: () => void;
  onChangeHeading: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBody: (props: EditorEvents["update"]) => void;
};

const CustomParagraph = Heading.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      toggleClassName:
        (className: any) =>
        ({ commands }: any) => {
          return commands.updateAttributes("paragraph", { class: className });
        },
    };
  },
});

const FillPostInfo = ({
  activity,
  onPost,
  onChangeHeading,
  onChangeBody,
}: IFillSchemaInfoProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      Text,
      Color,
      TextStyle,
      CustomParagraph,
      CharacterCount.configure({
        limit: 1000,
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
        <input
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
      <div className="flex justify-between">
        <div></div>
        <button
          onClick={handlePost}
          className="bg-teal-400 px-6 py-2.5 disabled:opacity-75 text-teal-50 font-medium ring-1 ring-teal-900/10 shadow shadow-teal-700/10 rounded-full"
        >
          Shoot
        </button>
      </div>
    </div>
  );
};

export default FillPostInfo;
