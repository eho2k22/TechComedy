import React from 'react'

interface Props {
  children: React.ReactNode
}

const Container = ({ children }: Props) => (
  <main className="p-8 rounded-3xl bg-white border text-center border-amber-800 shadow-xl max-w-xl flex flex-col gap-8 items-center justify-center">
    {children}
  </main>
)

export default Container
