import * as Toolbar from "@radix-ui/react-toolbar";
import {
  TextalignCenter,
  TextalignLeft,
  TextalignRight,
  TextBlock,
  TextBold,
  TextItalic,
} from "iconsax-react";
import { IEditorControls } from "./types";

export const EditorControls: IEditorControls = ({ editor }) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  if (!editor) return <div>Loading...</div>;

  return (
    <div>
      <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
        <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="bold"
            aria-label="Bold"
            onClick={handleBold}
          >
            <TextBold />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="italic"
            aria-label="Italic"
          >
            <TextItalic />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="strikethrough"
            aria-label="Strike through"
          >
            <TextBlock />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="ToolbarSeparator" />
        <Toolbar.ToggleGroup
          type="single"
          defaultValue="center"
          aria-label="Text alignment"
        >
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="left"
            aria-label="Left aligned"
          >
            <TextalignLeft />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="center"
            aria-label="Center aligned"
          >
            <TextalignCenter />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ToolbarToggleItem"
            value="right"
            aria-label="Right aligned"
          >
            <TextalignRight />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="ToolbarSeparator" />
        <Toolbar.Link
          className="ToolbarLink"
          href="#"
          target="_blank"
          style={{ marginRight: 10 }}
        >
          Edited 2 hours ago
        </Toolbar.Link>
        <Toolbar.Button
          className="ToolbarButton"
          style={{ marginLeft: "auto" }}
        >
          Share
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
};
