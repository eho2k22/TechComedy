import { Input as HeadlessInput, InputProps } from '@headlessui/react'
import React, { forwardRef } from 'react'

type Props = InputProps
type InputRef = React.ForwardedRef<HTMLInputElement>

const Input = (props: Props, ref: InputRef) => (
  <HeadlessInput
    {...props}
    ref={ref}
    className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
  />
)

export default forwardRef(Input)
