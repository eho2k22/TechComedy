'use client'

import Image from 'next/image'
import {
  Heading,
  Text,
  Footer,
  Container,
  Content,
  Backdrop,
} from '@/components/primitives'
import { PromptForm } from '@/components/composites'

import { useTextGenerator } from '@/hooks'

const Home = () => {
  const { message, onSubmit } = useTextGenerator()
  const defaultMessage =
    'Please enter a topic, select a format, and click button Compose.'

  return (
    <Backdrop>
      <Container>
        <Heading level={1}>Tech Comedy Central</Heading>
        <PromptForm onSubmit={onSubmit} />
        <Content>
          {message && <Text>{message}</Text>}
          {!message && <Text>{defaultMessage}</Text>}
        </Content>
        <Footer>Happy Prompting, Happy Roasting! from Promptlys !</Footer>
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

export default Home
