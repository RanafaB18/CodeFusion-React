import { forwardRef } from "react";
import ReactQuill from "react-quill";

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
const Editors = forwardRef((ref) => {
  return (
    <>
      <ReactQuill ref={ref} formats={formats} modules={modules}/>
    </>
  )
});

export default Editors;
