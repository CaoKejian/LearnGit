import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
interface IProps {
  children?: ReactNode
}

const Header: FC<IProps> = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <span>Git 之旅</span>
        <span className={s.content}>入职的第一次Git培训~</span>
      </div>
      <svg className={s.svg}><use xlinkHref='#react'></use></svg>
    </div>
  )
}

export default memo(Header)