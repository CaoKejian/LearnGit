import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Home.module.scss'
interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [aniState, setAniState] = useState('paused')
  setTimeout(() => {
    setAniState('running')
  }, 2000);
  return (
    <div className={s.wrapper}>
      <div className={s.context}>
        上岸第一事
        先斩<span className={s.fake}>意中人</span>
        <p>又想吵架了？</p>
      </div>
      <div className={s.content}>
        <div className={s.hoke} 
          style={{
            animationPlayState: aniState
          }}>
        </div>
      </div>
      {/* <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div>
      <div className={s.snow}> </div> */}
    </div>
  )
}

export default memo(Home)