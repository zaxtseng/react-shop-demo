import { PageHeader } from 'antd'
import React, { FC, ReactNode } from 'react'
import Navigation from './Navigation'

interface IProp {
  children: ReactNode,
  title: string,
  subTitle: string
}
const Layout: FC<IProp> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Navigation />
      <PageHeader title={title} subTitle={subTitle} />
      <div style={{width: '80%', margin: "0 auto"}}>{children}</div>
      </div>
  )
}

export default Layout