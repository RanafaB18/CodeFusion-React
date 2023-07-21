import { useContext, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import { YjsContext } from "../context/YjsContext";
import QuillCursors from "quill-cursors";
import { formats, modules } from "./CustomToolbar";

const QuillEditor = ({ytext}) => {
  Quill.register("modules/cursors", QuillCursors);
  const quillRef = useRef()
  let binding
  const { awareness } = useContext(YjsContext)
  console.log("Ytext", ytext, awareness)
  useEffect(() => {
    if (binding) {
      binding.destroy()
    }
    binding = new QuillBinding(ytext, quillRef.current.getEditor(), awareness)
  }, [ytext])
  return (
      <ReactQuill theme="snow" ref={quillRef} formats={formats} modules={modules} className="h-full"/>
  )
};

export default QuillEditor;
