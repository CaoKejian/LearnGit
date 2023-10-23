import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightBody.module.scss'
import { message } from 'antd'
import { codeSpanType, messageType } from '../type'
import { MockMessage } from '../../share/constant'

interface IProps {
  children?: ReactNode
  item: messageType[]
  updateNext: (isNext: boolean) => void
  loading: boolean
  step: number
  setLocalStorage: (item: messageType[]) => void
}
interface objType {
  content: string
  color: string
}
const colorMap = {
  'git': '#e18736',
  'alpha': '#76bcf7',
  'operator': '#e18736',
  'singleChar': '#a5d7fd'
}

const RightBody: FC<IProps> = ({ item, updateNext, loading, step, setLocalStorage }) => {
  const [msgArr, setMsgArr] = useState<messageType[]>(item)
  const [msgLoading, setMsgLoading] = useState(loading)
  const [time, setTime] = useState(0) // time 时间后动画结束
  const [codeList, setCodeList] = useState<any>([])
  const [messageApi, contextHolder] = message.useMessage()

  // 下一步
  useEffect(() => {
    if (MockMessage[step] === msgArr[length]) return
    if (!MockMessage[step]) {
      return messageApi.open({
        type: 'warning',
        content: '没有下一步了',
      })
    }
    const next = [...msgArr, MockMessage[step]]
    setMsgArr(next)
    setLocalStorage(next)
  }, [step])

  // 设置伪类
  const cancelAfter = (open: boolean) => {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const rules = styleSheet.cssRules || styleSheet.rules;
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          const rule: any = rules[j];
          if (rule.selectorText && rule.selectorText.endsWith("::after")) {
            if (open) {
              rule.style.width = "3px"
              rule.style.height = "1rem"
            } else {
              rule.style.width = "0"
              rule.style.height = "0"
            }
          }
        }
      }
    }
  }
  
  // 动画函数
  useEffect(() => {
    if(msgArr.length > 1) return
    const h1 = document.querySelector(`.${s.container}`)
    if (!h1) return
    const textLength = h1.textContent?.length || 0
    setTime(0.1 * textLength + 1)
    h1.innerHTML = h1.textContent!
      .replace(/\S/g, "<span>$&</span>")
      .replace(/\s/g, "<span>&nbsp;</span>")
    let delay = 0
    document.querySelectorAll('span').forEach((span, index) => {
      delay += 0.1
      if (index === 6) delay += 0.3
      span.style.setProperty('--delay', `${delay}s`)
    })
    h1.addEventListener('animationend', (e) => {
      if (e.target === document.querySelector('container span:last-child')) {
        h1.classList.add('ended')
      }
    })
  }, [msgArr, time])

  const createCodeList = (item: messageType) => {
    let word = item.code.split(' ')
    let obj: objType[] = []
    const pushToObj = (content: string, color: string) => {
      let temp = { content: content, color: color }
      obj.push(temp)
    }
    for (let i = 0; i < word.length; i++) {
      if (word[i] === 'git') {
        pushToObj(word[i], colorMap['git'])
      } else if (word[i] && /^[a-zA-Z]*$/.test(word[i])) {
        pushToObj(word[i], colorMap['alpha'])
      } else if (word[i] && /^[+\-*/=><]*$/.test(word[i])) {
        pushToObj(word[i], colorMap['operator'])
      } else if (word[i] && word[i].length === 1) {
        pushToObj(word[i], colorMap['singleChar'])
      } else {
        if (!word[i]) return;
        messageApi.open({
          type: 'error',
          content: `有不合格的代码格式${word[i]}`,
        })
      }
    }
    if (obj.length > 0 && time !== 0) {
      if (!msgLoading) {
        setCodeList([...codeList, obj])
        obj = []
        word = []
        cancelAfter(false)
        return
      }
      setTimeout(() => {
        setCodeList([...codeList, obj])
        obj = []
        word = []
        cancelAfter(false)
      }, time * 1000)
    }
  }
  useEffect(() => {
    if (msgArr.length > 0) {
      msgArr.forEach(item => {
        if (!item.code) return
        cancelAfter(true); // 初始化
        createCodeList(item);
      });
    }
  }, [msgArr, setCodeList, time, msgLoading])
  useEffect(() => {
    if (codeList.length !== 0) {
      updateNext(false)
    }
  }, [codeList])
  return (<>
    {contextHolder}
    <div className={s.wrapper}>
      {
        msgArr && msgArr.length !== 0 && msgArr.map((item, index) => {
          return <div key={index}>
            <div className={s.message}>
              <div className={s.actor}>
                <svg className={s.svg}><use xlinkHref='#bot'></use></svg>
              </div>
              <span className={s.container}
                style={{
                  animationDelay: time * 1000 + 's',
                }}
              >
                {item.content}
              </span>
            </div>
            {codeList[index] ?
              <div className={s.code}>
                {
                  codeList[index].map((item: codeSpanType, index: number) => {
                    return <span key={index} style={{ color: item.color }}>{item.content} </span>
                  })
                }
                <br />
              </div> : <div className={s.uncode}>
                <div>正在加载</div>
                <span className={s.loadingdotscontainer}>
                  <span className={s.loadingdot}></span>
                  <span className={s.loadingdot}></span>
                  <span className={s.loadingdot}></span>
                </span>
              </div>
            }
          </div>
        })
      }
    </div>
  </>

  )
}

export default memo(RightBody)