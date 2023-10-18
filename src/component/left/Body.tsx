import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
import { chatListType } from '../type'
import './index.css'
interface IProps {
  children?: ReactNode
  chatList: chatListType[]
}

const Body: FC<IProps> = ({ chatList }) => {
  const [curIndex, setCurIndex] = useState(0)
 
  return (
    <div className={s.body}>
      <ul>
        {
          chatList.map((item,index) => {
            return <li key={item.id} 
              className={`${curIndex === index ? 'active' : ''}`}
              onClick={() => setCurIndex(index)}
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