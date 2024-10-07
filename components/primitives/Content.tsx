import React from 'react'

interface Props {
  children: React.ReactNode
}

const Content = ({ children }: Props) => (
  <div className="flex flex-col gap-8 items-center justify-center bg-amber-400 rounded-2xl p-6">
    {children}
  </div>
)

export default Content
