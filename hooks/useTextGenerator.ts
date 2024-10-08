import { useState } from 'react'
import { generateText, type ITextGeneratorInput } from '@/services'

const useTextGenerator = () => {
  const [message, setMessage] = useState<string | null>(null)

  const generateMessage = async (input: ITextGeneratorInput) => {
    const { topic, contentType } = input
    const result = await generateText(topic, contentType)
    const { content, error } = result
    if (content) setMessage(content)
    if (error) setMessage(error)
  }

  console.log('useTextGenerator message:', message)

  return {
    message,
    generateMessage,
  }
}

export default useTextGenerator
