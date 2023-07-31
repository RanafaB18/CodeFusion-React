import React, { useCallback, useContext } from "react";
import { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import CustomToolbar from "./CustomToolbar";
import { YjsContext } from "../context/YjsContext";
import QuillCursors from 'quill-cursors'
import { ProviderContext } from "../context/ProviderContext";
import util from "../services"

Quill.register('modules/cursors', QuillCursors)
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
  const { awareness, color } = useContext(ProviderContext)

// You can observe when a user updates their awareness information
// awareness.on('change', changes => {
//   // Whenever somebody updates their awareness information,
//   // we log all awareness information from all users.
//   console.log(Array.from(awareness.getStates().values()))
// })

// You can think of your own awareness information as a key-value store.
// We update our "user" field to propagate relevant user information.
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: username,
  // Define a color that should be associated to the user:
  color: color // should be a hex color
})

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
        toolbar: "#toolbar",
      },
    });
    new QuillBinding(ytext, quill, awareness);
  }, []);
  return (
    <>
      <CustomToolbar />
      <div id="container" className="h-full max-w-md mx-auto w-full max-h-[86vh] md:max-w-full" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
