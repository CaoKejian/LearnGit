import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
import { Button } from 'antd'
interface IProps {
  children?: ReactNode
}

const Footer: FC<IProps> = () => {
  return (
    <div className={s.footer}>
      <Button>新的聊天</Button>
    </div>
  )
}

export default memo(Footer)