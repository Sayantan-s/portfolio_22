import { useUser } from "@hooks";
import { postsApi } from "@store/services/posts";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { createPortal } from "react-dom";

interface IProps {
  onRemove?: () => void;
}

const Tool = (props: IProps) => {
  return createPortal(
    <PostToolUI {...props} />,
    document.getElementById("tool") as HTMLElement
  );
};

export default Tool;

const PostToolUI = ({ onRemove }: IProps) => {
  const [createPost, { isLoading }] = postsApi.useCreatePostMutation();
  const user = useUser();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hey what's cooking!!!</p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-16 max-w-2xl p-4",
      },
    },
  });

  const handleCreateTweet = async () => {
    await createPost({
      details: {
        heading: "Ahora! Baila",
        body: editor?.getHTML()!,
      },
      activity: "promote",
    }).unwrap;
    editor?.commands.setContent("");
  };
  return (
    <>
      <div className="w-5/12 h-[600px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-30">
        Tool
      </div>
      <div
        className="w-full h-full bg-slate-900/50 fixed top-0 left-0 z-20 backdrop-blur-xl"
        onClick={onRemove}
      />
    </>
  );
};
