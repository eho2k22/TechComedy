import React from 'react'

import { Button as HeadlessButton, ButtonProps } from '@headlessui/react'

interface Props extends ButtonProps {
  children: React.ReactNode
}

const Button = ({ children, ...props }: Props) => (
  <HeadlessButton
    {...props}
    className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {children}
  </HeadlessButton>
)

export default Button
