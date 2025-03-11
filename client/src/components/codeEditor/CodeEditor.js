import React from 'react'
import Editor from '@monaco-editor/react';

export default function CodeEditor() {
    function handleEditorChange(value, event) {
        console.log('here is the current model value:', value);
      }
  return (
    <div>
       <Editor
      height="90vh"
      defaultLanguage="java"
      defaultValue="// some comment"
      onChange={handleEditorChange}
    />
    </div>
  )
}
