import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightBody.module.scss'
import { message } from 'antd'
import { messageType } from '../type'

interface IProps {
  children?: ReactNode
  item: messageType
  updateNext: (isNext: boolean) => void
  stopAnimation: boolean
}
interface objType {
  content: string
  color: string
}
const RightBody: FC<IProps> = ({ item, updateNext, stopAnimation }) => {
  const [time, setTime] = useState(0) // time 时间后动画结束
  const [codeList, setCodeList] = useState<objType[]>([])
  const [messageApi, contextHolder] = message.useMessage()

  const cancelAfter = (open: boolean) => {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const rules = styleSheet.cssRules || styleSheet.rules;
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          const rule:any = rules[j];
          if (rule.selectorText && rule.selectorText.endsWith("::after")) {
            if(open) {
              rule.style.width = "3px"
              rule.style.height = "1rem"
            }else{
              rule.style.width = "0"
              rule.style.height = "0"
            }
          }
        }
      }
    }
  }
  useEffect(() => {
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
  }, [time])

  const colorMap = {
    'git': '#e18736',
    'alpha': '#76bcf7',
    'operator': '#e18736',
    'singleChar': '#a5d7fd'
  }

  useEffect(() => {
    if (!item.code) return
    setCodeList([]) // 初始化
    cancelAfter(true) // 初始化

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
      setTimeout(() => {
        setCodeList(obj)
        obj = []
        word = []
        cancelAfter(false)
      }, time * 1000)
    }
  }, [item, setCodeList, time, stopAnimation])
  useEffect(() => {
    if (codeList.length !== 0) {
      updateNext(false)
    }
  }, [codeList])
  return (<>
    {contextHolder}
    <div className={s.wrapper}>
      <div className={s.message}>
        <div className={s.actor}>
          <svg className={s.svg}><use xlinkHref='#bot'></use></svg>
        </div>
        <span className={s.container}
          style={{
            animationDelay: `${stopAnimation ? '0s' : time * 1000 + 's'}`,
          }}
        >
          {item.content}
        </span>
      </div>
      {codeList.length !== 0 ?
        <div className={s.code}>
          {
            codeList.length !== 0 && codeList.map((item, index) => {
              return <span key={item.content} style={{ color: item.color }}>{item.content} </span>
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
  </>

  )
}

export default memo(RightBody)