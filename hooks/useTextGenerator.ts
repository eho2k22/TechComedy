import { useState } from 'react'
import { generateText, type ITextGeneratorInput } from '@/services'
import { useMutation } from '@tanstack/react-query'

const useTextGenerator = () => {
  const [message, setMessage] = useState<string | null>(null)

  const mutationFn = async (input: ITextGeneratorInput) => {
    const { topic, contentType } = input
    const result = await generateText(topic, contentType)
    setMessage(result)
    return result
  }

  const { mutateAsync: generateMessage, isPending: isGenerating } = useMutation(
    {
      mutationFn,
    },
  )

  console.log('useTextGenerator message:', message)

  return {
    message,
    generateMessage,
    isGenerating,
  }
}

export default useTextGenerator
