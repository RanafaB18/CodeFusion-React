import React, { useCallback, useContext } from "react";
import { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import CustomToolbar from "./CustomToolbar";
import { YjsContext } from "../context/YjsContext";
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
const TextEditor = ({ ytext }) => {
  const { awareness } = useContext(YjsContext)
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
      modules: modules,
    });
    new QuillBinding(ytext, quill, awareness);
  }, []);
  return (
    <>
      <CustomToolbar />
      <div id="container" className="h-full" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
