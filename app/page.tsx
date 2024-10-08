'use client'

import Image from 'next/image'
import {
  Heading,
  Text,
  Footer,
  Container,
  Content,
  Backdrop,
  Button,
} from '@/components/primitives'
import { PromptForm } from '@/components/composites'

import { useTextGenerator, useSpeachGenerator } from '@/hooks'

const Home = () => {
  const { message, generateMessage } = useTextGenerator()
  const { audioUrl, generateAudio, generateAudioPro } = useSpeachGenerator()

  if (audioUrl) {
    const audio = new Audio(audioUrl)
    audio.play()
  }

  const defaultMessage =
    'Please enter a topic, select a format, and click button Compose.'

  console.log('Home message:', message)
  console.log('Home audioUrl:', audioUrl)

  return (
    <Backdrop>
      <Container>
        <Heading level={1}>Tech Comedy Central</Heading>
        <PromptForm onSubmit={generateMessage} />
        <Content>
          {!message && <Text>{defaultMessage}</Text>}
          {message && <Text>{message}</Text>}
          {message && (
            <Button onClick={() => generateAudio(message)}>🎸 Play</Button>
          )}
          {message && (
            <Button onClick={() => generateAudioPro(message)}>
              🎸🎸 Play (Pro)
            </Button>
          )}
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
