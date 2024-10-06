import { DataInteractive } from '@headlessui/react'
import React, { forwardRef } from 'react'
import NextLink, { type LinkProps } from 'next/link'

type Props = LinkProps & React.ComponentPropsWithoutRef<'a'>
type LinkRef = React.ForwardedRef<HTMLAnchorElement>

const Link = (props: Props, ref: LinkRef) => (
  <DataInteractive>
    <NextLink {...props} ref={ref} />
  </DataInteractive>
)

export default forwardRef(Link)
