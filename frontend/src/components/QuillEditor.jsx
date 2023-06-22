import { useContext, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { QuillBinding } from "y-quill";
import { YjsContext } from "../context/YjsContext";
import QuillCursors from "quill-cursors";

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
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
    <div className="h-screen overflow-hidden" my_quill="yes">
      <ReactQuill theme="snow" ref={quillRef} formats={formats} modules={modules}/>
    </div>
  )
};

export default QuillEditor;
