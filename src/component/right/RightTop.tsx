import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightTop.module.scss'
import RightBody from './RightBody'
import { chatListType, messageType } from '../type'
import { MockMessage } from '../../share/constant'

interface IProps {
  children?: ReactNode
  updateNext: (isNext: boolean) => void
  curIndex: number
  chatList: chatListType[]
  step: number
}

const RightTop: FC<IProps> = ({ updateNext, curIndex, chatList, step }) => {
  const [msgArr, setMsgArr] = useState<messageType[]>([])

  useEffect(() => {
    console.log(curIndex)
    const storedData = JSON.parse(localStorage.getItem(`chat_${chatList[curIndex].id}`) as string)
    if (storedData) {
      setMsgArr(storedData)
    } else {
      setMsgArr([MockMessage[0]])
    }
  }, [chatList, curIndex])
  
  const setLocalStorage = (item: messageType[]) => {
    console.log(item)
    localStorage.setItem(`chat_${chatList[curIndex].id}`, JSON.stringify(item))
  }
  return (<>
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return <RightBody
              key={_item.id}
              item={msgArr}
              updateNext={updateNext}
              step={step}
              setLocalStorage={setLocalStorage}
            />
          }
        })
      }
    </div>
  </>
  )
}

export default memo(RightTop)