import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";


const Editors = ({ room }) => {
    let doc;
    let provider;

    const editorRef = useRef(null)
    useEffect(() => {
      doc = new Y.Doc()
      provider = new WebrtcProvider(room, doc);
      return () => {
        doc.destroy()
        provider.disconnect()
      }
    }, [])
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor


        const type = doc.getText("monaco")

        const binding = new MonacoBinding(
            type, editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        )
        console.log(provider.awareness)
    }
  return (
    <div className="w-full h-full">
      <Editor
      theme="vs-dark"
      onMount={handleEditorDidMount}
      language="javascript"
      />
    </div>
  );
};

export default Editors;
