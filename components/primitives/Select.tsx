'use client'

import React, { forwardRef } from 'react'

import {
  Listbox,
  ListboxProps,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

interface IOption {
  value: string
  label: string
}

type SelectRef = React.ForwardedRef<HTMLElement>

interface Props extends ListboxProps {
  options: IOption[]
  placeholder?: string
}

const Select = ({ options, placeholder, ...props }: Props, ref: SelectRef) => (
  <Listbox {...props} ref={ref}>
    <div className="relative">
      <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6">
        <span className="flex items-center">
          {props.value && (
            <span className="ml-3 block truncate">
              {options.find((option) => option.value === props.value)?.label}
            </span>
          )}
          {!props.value && placeholder && (
            <span className="ml-3 block text-gray-400 truncate">
              {placeholder}
            </span>
          )}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronDownIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          />
        </span>
      </ListboxButton>

      <ListboxOptions
        transition
        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
      >
        {options.map((option) => (
          <ListboxOption
            key={option.value}
            value={option.value}
            className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-amber-600 data-[focus]:text-white"
          >
            <div className="flex items-center">
              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                {option.label}
              </span>
            </div>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-amber-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
              <CheckIcon aria-hidden="true" className="h-5 w-5" />
            </span>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </div>
  </Listbox>
)

export default forwardRef(Select)
