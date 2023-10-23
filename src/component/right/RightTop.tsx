import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightTop.module.scss'
import RightBody from './RightBody'
import { chatListType, messageType } from '../type'
import { message } from 'antd'

interface IProps {
  children?: ReactNode
  updateNext: (isNext: boolean) => void
  messageArr: messageType[]
  curIndex: number
  chatList: chatListType[]
  step: number
}

const RightTop: FC<IProps> = ({ updateNext, messageArr, curIndex, chatList, step }) => {
  const [msgArr, setMsgArr] = useState<messageType[]>([messageArr[0]])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (messageArr[step] === msgArr[length]) return
    if (!messageArr[step]) {
      return messageApi.open({
        type: 'warning',
        content: '没有下一步了',
      })
    }
    const next = [messageArr[step], ...msgArr]
    setMsgArr(next)
  }, [step])
  useEffect(() => {
    if (chatList.length === 0) return
    console.log(chatList, curIndex)
    localStorage.setItem(`caht_${chatList[curIndex].id}`, JSON.stringify(msgArr))
  }, [msgArr])
  return (<>
    {contextHolder}
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return (<div key={_item.id} className={s.body_item}>
              {
                msgArr.map((item, index) => {
                  return <RightBody key={item.content} item={item} updateNext={updateNext} stopAnimation={index === msgArr.length - 1} />
                })
              }
            </div>
            )
          }
        })
      }
    </div>
  </>
  )
}

export default memo(RightTop)