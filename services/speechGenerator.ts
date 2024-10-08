'use server'

import { writeFile } from 'fs/promises'

import { TTSConverter, ISpeechGeneratorOutput } from './interfaces'

import ttsElevenLabs from './ttsElevenLabs'
import ttsGoogle from './ttsGoogle'

import {
  removeBrackets,
  replaceSpecialChars,
  removeEmotions,
} from './textFormatters'

const saveFile = async (fileName: string, data: any) => {
  const audioFileName = `${fileName}_${Date.now()}.mp3`
  await writeFile(`public/${audioFileName}`, data, 'binary')
  return { audioUrl: `/${audioFileName}` }
}

const convertTextToSpeech = async (text: string, converter: TTSConverter) => {
  switch (converter) {
    case TTSConverter.ElevenLabs: {
      const file = await ttsElevenLabs(removeBrackets(text))
      return file
    }
    case TTSConverter.Google: {
      const file = await ttsGoogle(
        replaceSpecialChars(removeBrackets(removeEmotions(text))),
      )
      return file
    }
    default:
      throw new Error('Invalid converter type')
  }
}

const generateSpeech = async (text: string, converter: TTSConverter): Promise<ISpeechGeneratorOutput> => {
  try {
    const file = convertTextToSpeech(text, converter)
    const result = saveFile(converter, file)
    return result
  } catch (error: any) {
    console.error(
      `Error synthesizing speech with ${converter}:`,
      error.response?.data || error.message,
    )
    return { error: 'Failed to generate content' }
  }
}

export default generateSpeech
