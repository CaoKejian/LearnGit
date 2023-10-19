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
  const [msgArr, setMsgArr] = useState([message[0]])
  useEffect(() => {
    // setObj(message[step])
  }, [step])

  return (
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return (<div key={_item.id}>
              {
                msgArr.map((item, index) => {
                  return <RightBody key={item.content} item={item} updateNext={updateNext} />
                })
              }
            </div>
            )
          }
        })
      }
    </div>
  )
}

export default memo(RightTop)