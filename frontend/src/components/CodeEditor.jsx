import { Editor } from "@monaco-editor/react";
import { useRef, useContext, useState, useEffect } from "react";
import { MonacoBinding } from "y-monaco";
import Compiler from "./Compiler";
import LanguagesDropdown from "./LanguagesDropdown";
import { languageOptions } from "../constants/langDropdown";
import { RoomContext } from "../context/RoomContext";
import { YjsContext } from "../context/YjsContext";

const CodeEditor = ({ ytext }) => {
  const editorRef = useRef();
  const { socket } = useContext(RoomContext)
  // const [language, setLanguage] = useState(languageOptions[0]);
  const { language, setLanguage } = useContext(YjsContext)
  useEffect(() => {
    socket.on('show-editors', () => {
      ytext.applyDelta([{ insert: ` ` }]);
      ytext.delete(0, 1)
    })
  }, [])
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editor]),
    );
  }
  return (
    <>
      <div className="w-full md:hidden">
        <LanguagesDropdown setLanguage={setLanguage}/>
      </div>
      <Editor
        theme="vs-dark"
        onMount={handleEditorDidMount}
        height={"50%"}
        width={"99%"}
        language={language === undefined ? "javascript" : language.value}
        className=""
      />
      <Compiler ytext={ytext} language={language}/>
    </>
  );
};

export default CodeEditor;
