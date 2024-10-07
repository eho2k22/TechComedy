import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

const Backdrop = ({ children }: Props) => {
  const bgImage = `bg-[url('https://msfpfmwdawonueqaevru.supabase.co/storage/v1/object/public/img/comedyclub.png')]`
  return (
    <div
      className={clsx(
        'overflow-y-auto grid items-center bg-cover bg-center bg-amber-800 justify-items-center min-h-screen p-8',
        bgImage,
      )}
    >
      {children}
    </div>
  )
}

export default Backdrop
