import { useContext, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { QuillBinding } from "y-quill";
import { YjsContext } from "../context/YjsContext";

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
  const quillRef = useRef()
  console.log("Ytext", ytext)
  let binding
  const { awareness } = useContext(YjsContext)
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
