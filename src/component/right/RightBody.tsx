import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightBody.module.scss'
interface IProps {
  children?: ReactNode
  content: string
  code?: string
}

const RightBody: FC<IProps> = ({ content, code }) => {
  const [time, setTime] = useState(0) // time 时间后动画结束

  useEffect(() => {
    const h1 = document.querySelector(`.${s.container}`)
    if (!h1) return
    const textLength = h1.textContent?.length || 0
    setTime(0.1 * textLength + 0.3)
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

  return (
    <div className={s.wrapper}>
      <div className={s.message}>
        <div className={s.actor}>
          <svg className={s.svg}><use xlinkHref='#bot'></use></svg>
        </div>
        <span className={s.container}
          style={{ animationDelay: `${time * 1000}s` }}
        >
          {content}
          
        </span>
      </div>
    </div>
  )
}

export default memo(RightBody)