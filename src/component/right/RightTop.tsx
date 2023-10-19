import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightTop.module.scss'
import RightBody from './RightBody'
import { chatListType, messageType } from '../type'
interface IProps {
  children?: ReactNode
  updateNext: (isNext: boolean) => void
  message: messageType[]
  curIndex: number
  chatList: chatListType[]
  step: number
}

const RightTop: FC<IProps> = ({ updateNext, message, curIndex, chatList, step }) => {
  const [obj, setObj] = useState(message[0])
  useEffect(() => {
    setObj(message[step])
  }, [step])

  return (
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return (
              <RightBody key={_item.id} content={obj.content} code={obj.code} updateNext={updateNext} />
            )
          }
        })
      }
    </div>
  )
}

export default memo(RightTop)