import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Editor from '../share/Editor'
import { Switch } from 'antd'
import s from './Home.module.scss'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  localStorage.setItem('theme', "vs-dark")
  return (<div className={s.wrapper}>
    <div className={s.switch}>
      <span>主题</span>
      <Switch
        checkedChildren={<svg className={s.svgDay}><use xlinkHref='#day'></use></svg>}
        unCheckedChildren={<svg className={s.svgDark}><use xlinkHref='#dark'></use></svg>}
        defaultChecked
      />
    </div>
    <Editor />
  </div>
  )
}

export default memo(Home)