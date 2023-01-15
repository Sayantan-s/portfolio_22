import { IEditorControls } from "./types";

export const EditorControls: IEditorControls = ({ children, editor }) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  if (!editor) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleBold}>b</button>
    </div>
  );
};
