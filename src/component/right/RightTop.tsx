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
  const [msgArr, setMsgArr] = useState<messageType[]>([message[0]])
  useEffect(() => {
    if(message[step] === msgArr[length]) return
    const next = [message[step], ...msgArr]
    setMsgArr(next)
  }, [step])
  useEffect(() => {
    console.log(msgArr)
  }, [msgArr])
  return (
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return (<div key={_item.id}>
              {
                msgArr.map((item,index) => {
                  return <RightBody key={index} item={item} updateNext={updateNext} stopAnimation={index === msgArr.length - 1} />
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