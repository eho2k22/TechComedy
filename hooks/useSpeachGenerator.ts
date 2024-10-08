import { useState } from 'react'
import {
  generateSpeech,
  type ISpeechGeneratorOutput,
  TTSConverter,
} from '@/services'

const useSpeachGenerator = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const saveAudioUrl = (result: ISpeechGeneratorOutput) => {
    const { audioUrl, error } = result
    if (audioUrl) setAudioUrl(audioUrl)
    if (error) console.error(error)
  }

  const generateAudio = async (text: string) => {
    const result = await generateSpeech(text, TTSConverter.Google)
    saveAudioUrl(result)
  }

  const generateAudioPro = async (text: string) => {
    const result = await generateSpeech(text, TTSConverter.ElevenLabs)
    saveAudioUrl(result)
  }

  console.log('useSpeachGenerator audioUrl:', audioUrl)

  return {
    audioUrl,
    generateAudio,
    generateAudioPro,
  }
}

export default useSpeachGenerator
