import { Editor } from "@tiptap/react";
import React, { PropsWithChildren } from "react";

interface IEditorControlsProps {
  editor: Editor | null;
  colors: string[];
}

export type IEditorControls = React.FC<PropsWithChildren<IEditorControlsProps>>;
