import React from 'react'

type Props = React.HTMLAttributes<HTMLParagraphElement>

const Footer = ({ children, ...props }: Props) => (
  <p {...props} className="max-w-2xl text-sm leading-6 text-gray-600">
    {children}
  </p>
)

export default Footer
