import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import s from './Header.module.scss'
import { Button, Modal } from 'antd'
interface IProps {
  children?: ReactNode
  addList: (num: number) => void
}

const Footer: FC<IProps> = ({ addList }) => {
  const click = () => {
    setOpen(true);
  }
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOk = (num: number) => {
    if (num === 1) {
      setOpen(false)
      addList(num)
      return
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      addList(num)
    }, 1000);
  }
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <div className={s.footer}>
      <Button onClick={click}>新的聊天</Button>
      <Modal
        open={open}
        title="新的聊天"
        onOk={() => handleOk(2)}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => handleOk(1)}>
            选择学习的模块
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={() => handleOk(2)}
          >
            开启新的对话
          </Button>,
        ]}
      >
        <div>开启和小丽的旅行吧~</div>
      </Modal>
    </div>
  )
}

export default memo(Footer)