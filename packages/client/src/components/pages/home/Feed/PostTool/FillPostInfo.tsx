import { TCreatePost } from "@store/types/posts";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorControls } from "./EditorControls";

type IFillSchemaInfoProps = Pick<TCreatePost, "activity"> & {
  onPost: () => void;
  onChangeHeading: (props: EditorEvents["update"]) => void;
  onChangeBody: (props: EditorEvents["update"]) => void;
};

const FillPostInfo = ({
  activity,
  onPost,
  onChangeHeading,
  onChangeBody,
}: IFillSchemaInfoProps) => {
  const hEditor = useEditor({
    extensions: [
      Heading.configure({
        HTMLAttributes: {
          class: "text-3xl font-semibold text-slate-700",
        },
      }),
      Document,
      Text,
      Placeholder.configure({
        placeholder:
          activity === "promote" ? "What's cooking?!!!" : "New Dollars $oon!!!",
        emptyNodeClass: "text-slate-500/30",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full p-2 text-3xl font-semibold text-slate-900",
      },
    },
    onUpdate: onChangeHeading,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
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
    hEditor?.commands.setContent("");
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {hEditor && <EditorControls editor={hEditor} />}
        <EditorContent editor={hEditor} />
        <EditorContent editor={editor} />
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
