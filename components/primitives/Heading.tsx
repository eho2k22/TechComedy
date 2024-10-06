import React from 'react'
import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const HEADING_STYLES = {
  6: 'text-xl',
  5: 'text-2xl',
  4: 'text-3xl',
  3: 'text-4xl',
  2: 'text-5xl',
  1: 'text-6xl',
}

const Heading = ({ level = 1, children, ...props }: Props) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  const HEADING_STYLE = HEADING_STYLES[level]

  return (
    <Tag
      className={clsx(
        'text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight',
        HEADING_STYLE,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Heading
