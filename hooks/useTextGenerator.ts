import { useState } from 'react'
import { generateText, type ITextGeneratorInput } from '@/services'

const useTextGenerator = () => {
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (data: ITextGeneratorInput) => {
    const { topic, contentType } = data
    const result = await generateText(topic, contentType)
    const { content, error } = result
    if (content) setMessage(content)
    if (error) setMessage(error)
  }

  console.log('useTextGenerator message:', message)

  return {
    message,
    onSubmit,
  }
}

export default useTextGenerator
