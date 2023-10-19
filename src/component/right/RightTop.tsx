import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './RightTop.module.scss'
import RightBody from './RightBody'
import { chatListType } from '../type'
interface IProps {
  children?: ReactNode
  updateNext: (isNext: boolean) => void
  obj: { content: string, code: string }
  curIndex: number
  chatList: chatListType[]
}

const RightTop: FC<IProps> = ({ updateNext, obj, curIndex, chatList }) => {
  const [content, setContent] = useState(obj.content)
  const [code, setCode] = useState(obj.code)
  useEffect(() => {
    console.log(obj)
    setContent(obj.content)
    setCode(obj.code)
  }, [obj])
  return (
    <div className={s.right_top}>
      {
        chatList.map((_item, index) => {
          if (curIndex === index) {
            return (
              <RightBody content={content} code={code} updateNext={updateNext} />
            )
          }
        })
      }
    </div>
  )
}

export default memo(RightTop)