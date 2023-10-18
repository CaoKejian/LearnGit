import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import MonacoEditor, { monaco } from "react-monaco-editor"
import s from './Editor.module.scss'

interface IProps {
  children?: ReactNode
  editorTheme: String
}

const Editor: FC<IProps> = ({ editorTheme }) => {
  const [code, setCode] = useState("// 在这里编写你的代码~");
  const onChange = (e: string) => {
    setCode(e)
  }
  const darkTheme = {
    'fontColor': '#bb9bf3',
    'editorBg': '#1e1e1e',
    'cursorBg': '#6382e9',
    'lineHeightColor': '#272b33',
    'lineColor': '#ffffff'
  }
  const dayTheme = {
    'fontColor': '#bb9bf3',
    'editorBg': '#ffffff',
    'cursorBg': '#6382e9',
    'lineHeightColor': '#e7f8ff',
    'lineColor': '#bea2f0'
  }
  const [theme, setTheme] = useState(dayTheme)
  const options: {} = {
    selectOnLineNumbers: true,
    fontSize: 16,
    cursorWidth: 3,
    cursorBlinking: 'expand',
    cursorSmoothCaretAnimation: true,
  }
  useEffect(() => {
    if(editorTheme === 'day'){
      setTheme(dayTheme)
    }else{
      setTheme(darkTheme)
    }
  }, [editorTheme])
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
        'editorLineNumber.activeForeground': theme.lineColor
      }
    });
    monaco.editor.setTheme('BlackTheme')
  }, [theme])
  const editorDidMount = (editor: any) => {
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