import { useContext, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import { YjsContext } from "../context/YjsContext";
import QuillCursors from "quill-cursors";
import CustomToolbar from "./CustomToolbar";

// Modules object for setting up the Quill editor
const QuillEditor = ({ytext}) => {
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
  Quill.register("modules/cursors", QuillCursors);
  const quillRef = useRef()
  let binding
  const { awareness } = useContext(YjsContext)
  useEffect(() => {
    if (binding) {
      binding.destroy()
    }
    binding = new QuillBinding(ytext, quillRef.current.getEditor(), awareness)
  }, [ytext])
  return (
      <>
      <CustomToolbar />
      <ReactQuill theme="snow" ref={quillRef} formats={formats} modules={modules} className="h-full"/>
      </>
  )
};

export default QuillEditor;
