import { useWebS } from "@context/Ws";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
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
        class: "focus:outline-none h-16 max-w-2xl p-4",
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
    <div className="bg-slate-100 rounded-xl mt-4">
      {editor ? (
        <BubbleMenu
          className="bg-slate-50 shadow-md p-1 flex"
          editor={editor}
          tippyOptions={{ duration: 200 }}
        >
          <button>B</button>
        </BubbleMenu>
      ) : null}
      <EditorContent editor={editor} />
      <div className="p-3 flex justify-between">
        <div />
        <button
          className="bg-gradient-to-br from-sky-400 to-teal-400 disabled:opacity-75 text-slate-50 font-medium shadow-lg shadow-teal-400/30 p-2.5 w-24 rounded-full"
          disabled={!allowToPost}
          onClick={handleCreateTweet}
        >
          Jweet
        </button>
      </div>
    </div>
  );
};
