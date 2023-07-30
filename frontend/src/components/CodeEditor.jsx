import { Editor } from "@monaco-editor/react"
import { useRef, useContext } from "react"
import {MonacoBinding} from 'y-monaco'
import { ProviderContext } from "../context/ProviderContext"

const CodeEditor = ({ytext}) => {
  const editorRef = useRef()
  const { awareness } = useContext(ProviderContext)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    const binding = new MonacoBinding(ytext, editorRef.current.getModel(), new Set([editorRef.current]), awareness)
  }
  return (
    <Editor
      theme="vs-dark"
      onMount={handleEditorDidMount}
      className="h-full"
    />
  )
}

export default CodeEditor
