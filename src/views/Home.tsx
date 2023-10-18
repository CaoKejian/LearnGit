import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Editor from '../share/Editor'
import { Switch } from 'antd'
import s from './Home.module.scss'
import { AppContext } from '../share/AppContext'
import Header from '../component/left/Header'
import Footer from '../component/left/Footer'
import Body from '../component/left/Body'
import { chatListType } from '../component/type'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [editorTheme, setEditorTheme] = useState('day')
  const changeTheme = (e: boolean) => {
    doSomething(e)
    if(!e){
      setEditorTheme('dark')
    }else{
      setEditorTheme('day')
    } 
  }
  const { doSomething } = React.useContext(AppContext)

  const [chatList, setChatList] = useState<chatListType[]>([])
  useEffect(() => {
    setChatList([
      {id:1, name:'123',time:'2023-10-19'},
      {id:2, name:'456',time:'2023-10-29'},
      {id:3, name:'xx',time:'2023-10-09'},
    ])
  },[])
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
    <div className={s.editor}>
      <div className={s.left}>
        <Header />
        <Body chatList={chatList}/>
        <Footer />
      </div>
      <div className={s.right}>
        <div className={s.right_top}>hahaha</div>
        <div className={s.right_bottom}>
          <Editor editorTheme={editorTheme}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default memo(Home)