import { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
import { chatListType } from '../type'
import './index.css'
interface IProps {
  children?: ReactNode
  chatList: chatListType[]
  curIndex: number
  changeIndex: (index: number) => void
}

const Body: FC<IProps> = ({ chatList, curIndex = 0, changeIndex }) => {
  useEffect(() => {
    console.log(curIndex)
  }, [changeIndex])
  return (
    <div className={s.body}>
      <ul>
        {
          chatList.map((item, index) => {
            return <li key={item.id}
              className={`${curIndex === index ? 'active' : ''}`}
              onClick={() => changeIndex(index)}
            >
              <span className={s.name}>{item.name}</span>
              <span className={s.time}>{item.time}</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default memo(Body)