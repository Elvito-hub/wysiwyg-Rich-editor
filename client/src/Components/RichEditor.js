import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import createImagePlugin from "@draft-js-plugins/image";

import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createFocusPlugin from "@draft-js-plugins/focus";

import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import "./Styles/editorStyles.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import buttonStyles from "./Styles/buttonStyles.css";
import toolbarStyles from "./Styles/toolbarStyles.css";
import mockUpload from "./mockUpload";

import {
  BoldButton,
  ItalicButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  UnderlineButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import createEmojiPlugin from "@draft-js-plugins/emoji";
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const textAlignmentPlugin = createTextAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const { Toolbar } = staticToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { InlineToolbar } = inlineToolbarPlugin;
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(resizeablePlugin.decorator, alignmentPlugin.decorator, focusPlugin.decorator, blockDndPlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
const plugins = [
  staticToolbarPlugin,
  textAlignmentPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  emojiPlugin,
  hashtagPlugin,
  inlineToolbarPlugin,
];

const RichEditor = () => {
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(editorState);

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const alignmentStyles = ["left", "right", "center"];

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "superFancyBlockquote";
    }
  }
  const focus = () => {
    editor.focus();
  };
  return (
    <div>
      <div className="editor" onClick={focus}>
        <Toolbar>
          {(externalProps) => (
            <div className="icons-toolbar">
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
              <textAlignmentPlugin.TextAlignment {...externalProps} />

              {/* <AlignLeftOutlined onMouseDown={() => applyAlignment("left")} />
              <AlignCenterOutlined onMouseDown={() => applyAlignment("center")} />
              <AlignRightOutlined onMouseDown={() => applyAlignment("right")} /> */}
            </div>
          )}
        </Toolbar>
        <Editor editorState={editorState} onChange={onChange} blockStyleFn={myBlockStyleFn} plugins={plugins} ref={editor} />
        <InlineToolbar />
        <EmojiSuggestions />
      </div>

      <div className="options">
        <EmojiSelect closeOnEmojiSelect />
      </div>
    </div>
  );
};

export default RichEditor;
