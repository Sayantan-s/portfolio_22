import { useWebS } from "@context/Ws";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export const PostTool = () => {
  const [allowToPost, setAllowToPost] = useState(false);
  const { isConnected, socket } = useWebS();

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

  const handleCreateTweet = () => {
    if (isConnected) {
      socket.emit("create_jweet", {
        _id: socket.id,
        payload: editor?.getHTML(),
      });
    }
  };

  return (
    <div className="border border-slate-100 rounded-xl mt-2">
      <EditorContent editor={editor} />
      <div className="p-4">
        <button
          className="bg-sky-500 text-slate-50 font-medium p-2 rounded-full"
          disabled={!allowToPost}
          onClick={handleCreateTweet}
        >
          Jweet
        </button>
      </div>
    </div>
  );
};
