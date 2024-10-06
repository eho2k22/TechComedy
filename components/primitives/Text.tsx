import React from 'react'

type Props = React.HTMLAttributes<HTMLParagraphElement>

const Text = ({ children, ...props }: Props) => (
  <p {...props} className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
    {children}
  </p>
)

export default Text
