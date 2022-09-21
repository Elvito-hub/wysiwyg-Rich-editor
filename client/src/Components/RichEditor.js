import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import createImagePlugin from "@draft-js-plugins/image";

import createAlignmentPlugin from "@draft-js-plugins/alignment";

import createFocusPlugin from "@draft-js-plugins/focus";

import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";

import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import "./Styles/editorStyles.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
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
const { Toolbar } = staticToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
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
];

const RichEditor = () => {
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(editorState);

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const alignmentStyles = ["left", "right", "center"];
  //   const addImage = () => {

  //     // CREATE <img /> block
  //     const entityKey = editorState // from STATE
  //       .getCurrentContent()
  //       .createEntity('IMAGE', 'MUTABLE', {
  //         src:'some_img_url',
  //         height: '100px',
  //         width: '100px',
  //     }).getLastCreatedEntityKey();

  //     // NEW EDITOR STATE
  //     const newEditorState = AtomicBlockUtils.insertAtomicBlock(
  //       editorState,
  //       entityKey,
  //       ' '
  //     );

  //     // SETSTATE
  //     setEditorState(newEditorState);
  // }
  //   const applyAlignment = (newStyle) => {
  //     let styleForRemove = alignmentStyles.filter((style) => style !== newStyle);
  //     let currentContent = editorState.getCurrentContent();
  //     let selection = editorState.getSelection();
  //     let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
  //     let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
  //     let isBackward = selection.getIsBackward();

  //     let selectionMerge = {
  //       anchorOffset: 0,
  //       focusOffset: focusBlock.getLength(),
  //     };

  //     if (isBackward) {
  //       selectionMerge.anchorOffset = anchorBlock.getLength();
  //     }
  //     let finalSelection = selection.merge(selectionMerge);
  //     let finalContent = styleForRemove.reduce((content, style) => Modifier.removeInlineStyle(content, finalSelection, style), currentContent);
  //     let modifiedContent = Modifier.applyInlineStyle(finalContent, finalSelection, newStyle);
  //     const nextEditorState = EditorState.push(editorState, modifiedContent, "change-inline-style");
  //     setEditorState(nextEditorState);
  //   };
  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "superFancyBlockquote";
    }
  }
  return (
    <div>
      <div className="editor">
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
        <EmojiSuggestions />
      </div>

      <div className="options">
        <EmojiSelect closeOnEmojiSelect />
      </div>
    </div>
  );
};

export default RichEditor;
