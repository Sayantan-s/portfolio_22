import * as Toolbar from "@radix-ui/react-toolbar";
import { BubbleMenu } from "@tiptap/react";
import { TextBold, TextItalic, TextUnderline } from "iconsax-react";
import { IEditorControls } from "./types";

export const EditorControls: IEditorControls = ({ editor, colors }) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleUnderline = () => {
    editor?.chain().focus().toggleStrike().run();
  };

  const handleColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  if (!editor) return <div>Loading...</div>;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-white px-2 py-1 shadow-md shadow-slate-600/10 rounded-3xl"
    >
      <Toolbar.Root
        className="ToolbarRoot flex items-center"
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
            onClick={handleItalic}
          >
            <TextItalic className="w-4 h-4" color="rgb(71 85 105)" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem p-1 hover:bg-slate-200 rounded-sm"
            value="underline"
            aria-label="Underline"
            onClick={handleUnderline}
          >
            <TextUnderline className="w-4 h-4" color="rgb(71 85 105)" />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="ToolbarSeparator bg-slate-300 w-[1px] h-3 mx-4" />

        <Toolbar.ToggleGroup
          className="flex space-x-2"
          type="multiple"
          aria-label="Text formatting"
        >
          {colors.map((color) => (
            <Toolbar.ToggleItem
              key={color}
              className="ToolbarToggleItem rounded-sm flex items-center"
              value={`color-${color}`}
              aria-label={`Color-${color}`}
            >
              <button
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-full border border-slate-200"
                onClick={() => handleColor(color)}
              />
            </Toolbar.ToggleItem>
          ))}
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </BubbleMenu>
  );
};
