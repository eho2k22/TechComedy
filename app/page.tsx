'use client'

import Image from 'next/image'
import { Heading, Text } from '@/components/primitives'

import { PromptForm } from '@/components/composites'

export default function Home() {
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Heading level={1}>Tech Comedy Central</Heading>
        <PromptForm onSubmit={onSubmit} />
        <Text>Happy Prompting, Happy Roasting! from Promptlys !</Text>
        <Image
          className="dark:invert"
          src="https://msfpfmwdawonueqaevru.supabase.co/storage/v1/object/public/img/promptlys-150.png"
          alt="Promptlys logo"
          width={64}
          height={64}
          priority
        />
      </main>
    </div>
  )
}
