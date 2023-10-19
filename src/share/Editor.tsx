import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import MonacoEditor, { monaco } from "react-monaco-editor"
import s from './Editor.module.scss'
import {Button} from 'antd'

interface IProps {
  children?: ReactNode
  editorTheme: String
  next: boolean
  updateNext: (isNext:boolean) => void
}

const Editor: FC<IProps> = ({ editorTheme, next, updateNext }) => {
  const [code, setCode] = useState("// 在这里编写你的代码~ || shift + Enter 为发送键哦~");
  const onChange = (e: string) => {
    setCode(e)
  }
  const clickSubmit = () => {
    console.log(code)
    setCode('')
  }
  const clickNext = () => {
    updateNext(true)
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
    const theme = JSON.parse(localStorage.getItem('git_theme') as string)
    if (!theme) {
      return setTheme(darkTheme)
    } else if (theme) {
      return setTheme(dayTheme)
    }
    if (editorTheme === 'day') {
      setTheme(dayTheme)
    } else {
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
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, function() {
      clickSubmit()
    })
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
      <div className={s.bt}>
        <Button type='primary' onClick={clickSubmit}>发送</Button>
        <Button type='primary' className={s.next} disabled={next} onClick={clickNext}>下一问</Button>
      </div>
    </div>
  )
}

export default memo(Editor)