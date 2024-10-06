import React from 'react'

import { Input as HeadlessInput, InputProps } from '@headlessui/react'

type Props = InputProps

const Input = (props: Props) => (
  <HeadlessInput
    {...props}
    className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  />
)

export default Input
