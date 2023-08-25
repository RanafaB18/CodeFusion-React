import React, { useCallback, useContext, useEffect } from "react";
import { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import CustomToolbar from "./CustomToolbar";
import QuillCursors from 'quill-cursors'
import { ProviderContext } from "../context/ProviderContext";
import { Socket } from "socket.io-client";
import { RoomContext } from "../context/RoomContext";


// Formats objects for setting up the Quill editor
const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];
const TextEditor = ({ ytext, username }) => {
  Quill.register('modules/cursors', QuillCursors)
  const { awareness, color, provider } = useContext(ProviderContext)
  const { socket } = useContext(RoomContext)
  awareness.setLocalStateField('user', {
    name: username,
    color: color // should be a hex color
  })
  useEffect(() => {
    socket.on('user-joined', () => {
      ytext.applyDelta([{ insert: ` ` }]);
      ytext.delete(0, 1)
    })
  }, [])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      formats: formats,
      modules: {
        cursors: true,
        toolbar: "#toolbar",
      },
    });
    try {
      const binding = new QuillBinding(ytext, quill, provider.awareness);
    } catch(e) {
      console.log("Error", e);
    }
  }, []);
  return (
    <>
      <CustomToolbar />
      <div id="container" className="h-full max-w-[23rem] md:max-w-[41rem] mx-auto w-full sm:max-w-[35rem] max-h-[86vh] lg:max-w-full" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
