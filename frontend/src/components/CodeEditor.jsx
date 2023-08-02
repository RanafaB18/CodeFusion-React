import { Editor } from "@monaco-editor/react"
import { useRef, useContext, useEffect } from "react"
import {MonacoBinding} from 'y-monaco'
import { ProviderContext } from "../context/ProviderContext"

const CodeEditor = ({ytext, username}) => {
  const editorRef = useRef()
  const { color, awareness } = useContext(ProviderContext)
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    const binding = new MonacoBinding(ytext, editorRef.current.getModel(), new Set([editor]), awareness)
  }
  return (
    <Editor
      theme="vs-dark"
      onMount={handleEditorDidMount}
      className="h-full"
      language="javascript"

    />
  )
}

export default CodeEditor
