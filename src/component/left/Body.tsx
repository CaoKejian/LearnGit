import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
import { chatListType } from '../type'
interface IProps {
  children?: ReactNode
  chatList: chatListType[]
}

const Body: FC<IProps> = ({ chatList }) => {
  return (
    <div className={s.body}>
      <ul>
        {
          chatList.map(item => {
            return <li key={item.id}>
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