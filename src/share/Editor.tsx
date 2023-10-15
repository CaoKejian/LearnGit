import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import MonacoEditor from "react-monaco-editor"

interface IProps {
  children?: ReactNode
}

const Editor: FC<IProps> = () => {
  const [code, setCode] = useState("123123");
  const theme = localStorage.getItem('theme')
  const onChange = () => {
    console.log('onChange')
  }
  const editorDidMount = () => {
    console.log('editorDidMount')
  }
  const options = {
    selectOnLineNumbers: true,
    fontSize: 16,
  }
  return (
    <MonacoEditor
      width="800"
      height="200"
      language="javascript"
      theme={theme}
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  )
}

export default memo(Editor)