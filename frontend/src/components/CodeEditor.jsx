import { Editor } from "@monaco-editor/react";
import { useRef, useContext, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { ProviderContext } from "../context/ProviderContext";
import Compiler from "./Compiler";
import LanguagesDropdown from "./LanguagesDropdown";
import { languageOptions } from "../constants/langDropdown";

const CodeEditor = ({ ytext }) => {
  const editorRef = useRef();
  const { awareness } = useContext(ProviderContext);
  const [language, setLanguage] = useState(languageOptions[0]);

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
