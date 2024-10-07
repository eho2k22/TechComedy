'use client'

import Image from 'next/image'
import {
  Heading,
  Text,
  Container,
  Content,
  Backdrop,
} from '@/components/primitives'
import { PromptForm } from '@/components/composites'

export default function Home() {
  const onSubmit = (data: any) => console.log(data)

  return (
    <Backdrop>
      <Container>
        <Heading level={1}>Tech Comedy Central</Heading>
        <PromptForm onSubmit={onSubmit} />
        <Content>
          Please enter a topic, select a format, and click button Compose.
        </Content>
        <Text>Happy Prompting, Happy Roasting! from Promptlys !</Text>
        <Image
          className="dark:invert"
          src="https://msfpfmwdawonueqaevru.supabase.co/storage/v1/object/public/img/promptlys-150.png"
          alt="Promptlys logo"
          width={64}
          height={64}
          priority
        />
      </Container>
    </Backdrop>
  )
}
