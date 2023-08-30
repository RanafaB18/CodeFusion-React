import { Editor } from "@monaco-editor/react";
import { useRef, useContext, useState, useEffect } from "react";
import { MonacoBinding } from "y-monaco";
import Compiler from "./Compiler";
import LanguagesDropdown from "./LanguagesDropdown";
import { RoomContext } from "../context/RoomContext";
import { YjsContext } from "../context/YjsContext";

const CodeEditor = ({ ytext }) => {
  const editorRef = useRef();
  const { socket, copy, setCopy, setShowClipBoardModal, setVisible } = useContext(RoomContext)
  const { language, setLanguage } = useContext(YjsContext)
  useEffect(() =>{
    if (copy === true) {
      navigator.clipboard.writeText(ytext).then(
        () => {
          setShowClipBoardModal({text: "Paste into your code editor", show: true});
          setTimeout(() => {
            setShowClipBoardModal({text:"Paste and send anywhere to invite others to join!", show:false});
            setVisible(false);
          }, 3000);
        },
        () => {
          console.log("Error copying to clipboard");
        }
      );
    }
    setCopy(false)
  }, [copy])
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
