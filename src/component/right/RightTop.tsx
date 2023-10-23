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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`chat_${chatList[curIndex].id}`) as string);
    console.log('local', storedData);
    if (storedData) {
      setMsgArr(storedData);
      setLoading(false);
    } else {
      setMsgArr([MockMessage[0]]);
      setLoading(true);
    }
  }, [chatList, curIndex])
  
  const setLocalStorage = (item: messageType[]) => {
    console.log(item, curIndex)
    localStorage.setItem(`chat_${chatList[curIndex].id}`, JSON.stringify(item))
  }
  return (<>
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return <RightBody
              key={index}
              item={msgArr}
              updateNext={updateNext}
              loading={loading}
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