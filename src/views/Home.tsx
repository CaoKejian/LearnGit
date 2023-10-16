import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Editor from '../share/Editor'
import { Button, Switch } from 'antd'
import s from './Home.module.scss'
import { AppContext } from '../share/AppContext'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  localStorage.setItem('theme', "vs-dark")
  const changeTheme = (e: boolean) => {
    doSomething(e)
  }
  const { doSomething } = React.useContext(AppContext);

  return (<div className={s.wrapper}>
    <div className={s.switch}>
      <span>主题</span>
      <Switch
        className={s.switchModal}
        checkedChildren={<svg className={s.svgDay}><use xlinkHref='#day'></use></svg>}
        unCheckedChildren={<svg className={s.svgDark}><use xlinkHref='#dark'></use></svg>}
        defaultChecked
        onClick={(e) => changeTheme(e)}
      />
    </div>
    <Editor />
  </div>
  )
}

export default memo(Home)