import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Editor from '../share/Editor'
import { Button } from 'antd'
interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  localStorage.setItem('theme', "vs-dark")
  return (<>
    <input type="checkbox" id="toggleSwitch"></input>
    <Editor />
  </>
  )
}

export default memo(Home)