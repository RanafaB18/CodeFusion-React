import { Editor } from "@monaco-editor/react";
import { useRef, useContext } from "react";
import { MonacoBinding } from "y-monaco";
import { ProviderContext } from "../context/ProviderContext";
import { YjsContext } from "../context/YjsContext";
import Compiler from "./Compiler";

const CodeEditor = ({ ytext, username }) => {
  const editorRef = useRef();
  const { awareness } = useContext(ProviderContext);
  const { language } = useContext(YjsContext)
  console.log("Language", language)
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const binding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editor]),
      awareness
    );
  }
  return (
    <>
      <Editor
        theme="vs-dark"
        onMount={handleEditorDidMount}
        height={"50%"}
        width={"99%"}
        language={language === undefined ? "javascript" : language.value}
      />
      <Compiler ytext={ytext}/>
    </>
  );
};

export default CodeEditor;
