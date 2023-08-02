import React, { useCallback, useContext } from "react";
import { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import CustomToolbar from "./CustomToolbar";
import { YjsContext } from "../context/YjsContext";
import QuillCursors from 'quill-cursors'
import { ProviderContext } from "../context/ProviderContext";
import util from "../services"

// Modules object for setting up the Quill editor
const modules = {
  toolbar: "#toolbar",
};

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
  console.log("Ytext docs", ytext)
  awareness.setLocalStateField('user', {
    // Define a print name that should be displayed
    name: username,
    // Define a color that should be associated to the user:
    color: color // should be a hex color
  })

console.log("Awareness", awareness)
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
    const binding = new QuillBinding(ytext, quill, provider.awareness);
  }, []);
  return (
    <>
      <CustomToolbar />
      <div id="container" className="h-full max-w-[23rem] md:max-w-[41rem] mx-auto w-full sm:max-w-[35rem] max-h-[86vh] lg:max-w-full" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
