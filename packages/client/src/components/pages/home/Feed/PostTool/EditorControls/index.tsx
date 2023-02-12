import * as Toolbar from "@radix-ui/react-toolbar";
import { BubbleMenu } from "@tiptap/react";
import { TextBold, TextItalic, TextUnderline } from "iconsax-react";
import { IEditorControls } from "./types";

export const EditorControls: IEditorControls = ({ editor }) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleColor = () => {};

  if (!editor) return <div>Loading...</div>;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-slate-50 rounded-md"
    >
      <Toolbar.Root
        className="ToolbarRoot flex p-1"
        aria-label="Formatting options"
      >
        <Toolbar.ToggleGroup
          className="flex space-x-2"
          type="multiple"
          aria-label="Text formatting"
        >
          <Toolbar.ToggleItem
            className="ToolbarToggleItem p-1 hover:bg-slate-200 rounded-sm"
            value="bold"
            aria-label="Bold"
            onClick={handleBold}
          >
            <TextBold className="w-4 h-4" color="rgb(71 85 105)" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem p-1 hover:bg-slate-200 rounded-sm"
            value="italic"
            aria-label="Italic"
          >
            <TextItalic className="w-4 h-4" color="rgb(71 85 105)" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem p-1 hover:bg-slate-200 rounded-sm"
            value="italic"
            aria-label="Italic"
          >
            <TextUnderline className="w-4 h-4" color="rgb(71 85 105)" />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="ToolbarSeparator" />
      </Toolbar.Root>
    </BubbleMenu>
  );
};
