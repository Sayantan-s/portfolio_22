import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { TPostToolProps } from "./types";

export const PostTool: TPostToolProps = ({ onTweet }) => {
  const [allowToPost, setAllowToPost] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hey what's cooking!!!</p>",
    editorProps: {
      handleClick: () => {
        setAllowToPost(true);
      },
      attributes: {
        class: "focus:outline-none h-28 p-4",
      },
    },
  });

  const handleCreateTweet = () => onTweet(editor?.getHTML());

  return (
    <div className="border border-slate-100 rounded-md mt-2">
      <EditorContent editor={editor} />
      <button disabled={!allowToPost} onClick={handleCreateTweet}>
        Jweet
      </button>
    </div>
  );
};
