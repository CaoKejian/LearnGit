import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import MonacoEditor, { monaco } from "react-monaco-editor"
import s from './Editor.module.scss'

interface IProps {
  children?: ReactNode
}

const Editor: FC<IProps> = () => {
  const [code, setCode] = useState("// 在这里编写你的代码~");
  const onChange = (e: string) => {
    setCode(e)
  }
  const darkTheme = {
    'fontColor': '#bb9bf3',
    'editorBg': '#ffffff',
    'cursorBg': '#6382e9',
    'lineHeightColor': '#272b33',
  }
  const dayTheme = {
    'fontColor': '#bb9bf3',
    'editorBg': '#ffffff',
    'cursorBg': '#6382e9',
    'lineHeightColor': '#e7f8ff',
  }
  const [theme, setTheme] = useState(dayTheme)
  const options:{} = {
    selectOnLineNumbers: true,
    fontSize: 16,
    cursorWidth: 3,
    cursorBlinking: 'expand',
    cursorSmoothCaretAnimation: true,
  }
  useEffect(() => {
    monaco.editor.defineTheme('BlackTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.foreground': theme.fontColor,
        'editor.background': theme.editorBg,
        'editorCursor.foreground': theme.cursorBg,
        'editor.lineHighlightBackground': theme.lineHeightColor,
      }
    });
    monaco.editor.setTheme('BlackTheme')
  }, [])
  const editorDidMount = (editor:any) => {
    editor.onDidBlurEditorWidget(() => {
      console.log('test')
    })
  }
  return (
    <div className={s.container}>
      <MonacoEditor
        language="javascript"
        theme='BlackTheme'
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div>
  )
}

export default memo(Editor)