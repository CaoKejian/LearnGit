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
import { Time } from '../share/Time'
import RightTop from '../component/right/RightTop'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [editorTheme, setEditorTheme] = useState('day')
  const [defaultSwitch, setDefaultSwitch] = useState<boolean>(true)
  const [next, setNext] = useState<boolean>(true) // 控制下一步
  const [step, setStep] = useState(0)

  /* 控制下一步 */
  const updateNext = (isNext: boolean) => {
    if (isNext) {
      setNext(true)
      setStep(step + 1)
    } else {
      setNext(false)
    }
  }

  /* 切换主题 */
  const changeTheme = (e: boolean) => {
    setDefaultSwitch(!defaultSwitch)
    localStorage.setItem('git_theme', JSON.stringify(e))
    doSomething(e)
    if (!e) {
      setEditorTheme('dark')
    } else {
      setEditorTheme('day')
    }
  }
  const { doSomething } = React.useContext(AppContext)

  /* 控制列表增添 */
  const initialChatList: chatListType[] = [{ id: 0, name: 'git之旅', time: Time(Date.now()) }];
  const [chatList, setChatList] = useState<chatListType[]>(initialChatList)
  useEffect(() => {
    const LocalList = JSON.parse(localStorage.getItem('chatList') as string)
    if (!LocalList) return
    setChatList(LocalList)
  }, [])
  useEffect(() => {
    const localIndex = JSON.parse(localStorage.getItem('chatlist_index') as string)
    setCurIndex(localIndex ? localIndex : 0)
    if(chatList.length === 0) return
    localStorage.setItem('chatList', JSON.stringify(chatList))
  }, [chatList])

  /* 控制列表的index */
  const [curIndex, setCurIndex] = useState(0)
  const changeIndex = (index: number) => {
    setCurIndex(index)
    localStorage.setItem('chatlist_index', JSON.stringify(index))
  }

  /* 主题change */
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('git_theme') as string)
    if (!theme) {
      setDefaultSwitch(false)
      setEditorTheme('dark')
    }
  }, [defaultSwitch])

  const addList = (num: number) => {
    if (num === 1) {
      setChatList((p) => [
        { id: chatList.length, name: '选择一个模块', time: Time(Date.now()) },
        ...p,
      ])
      setCurIndex(0)
    } else {
      setChatList((p) => [
        { id: chatList.length, name: 'git之旅', time: Time(Date.now()) },
        ...p,
      ])
      setCurIndex(0)
    }
  }
  return (<div className={s.wrapper}>
    <div className={s.switch}>
      <span>主题</span>
      <Switch
        className={s.switchModal}
        checkedChildren={<svg className={s.svgDay}><use xlinkHref='#day'></use></svg>}
        unCheckedChildren={<svg className={s.svgDark}><use xlinkHref='#dark'></use></svg>}
        checked={defaultSwitch}
        onClick={(e) => changeTheme(e)}
      />
    </div>
    <div className={s.editor}>
      <div className={s.left}>
        <Header />
        <Body chatList={chatList} curIndex={curIndex} changeIndex={changeIndex} />
        <Footer addList={addList} />
      </div>
      <div className={s.right}>
        <RightTop
          updateNext={updateNext}
          step={step}
          curIndex={curIndex}
          chatList={chatList}
        />
        <div className={s.right_bottom}>
          <Editor editorTheme={editorTheme} next={next} updateNext={updateNext} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default memo(Home)