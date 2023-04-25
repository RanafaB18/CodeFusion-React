import Editor from "@monaco-editor/react";
import { useRef } from "react";
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";


const Editors = ({ room }) => {
    const editorRef = useRef(null)
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor

        const doc = new Y.Doc()

        const type = doc.getText("monaco")
        const provider = new WebrtcProvider(room, doc);

        const binding = new MonacoBinding(
            type, editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        )
        console.log(provider.awareness)
    }
  return (
    <div>
      <Editor
      height={"100vh"}
      width={"100vw"}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      language="javascript"
      />
    </div>
  );
};

export default Editors;
