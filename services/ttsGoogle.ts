import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const ttsClient = new TextToSpeechClient()

const synthesizeSpeechWithRetry = async (
  ssmlText: string,
  maxRetries: number = 3,
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const request = {
        //input: { text: text },
        input: { ssml: ssmlText },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Casual-K', // A male voice that sounds more natural
          ssmlGender: 'MALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          pitch: 0.7, // Slightly lower pitch for a more mature sound
          speakingRate: 1.2, // Slightly faster for comedic timing
        },
      }
      const [response] = await ttsClient.synthesizeSpeech(request)
      return response
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error)
      if (i === maxRetries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second before retrying
    }
  }
}

const ttsGoogle = async (text: string) => {
  const simpleSsmlText = `<speak><prosody rate="1.1" pitch="+2st">${text}</prosody></speak>`

  const complexSsmlText = `<speak>
      <prosody rate="1.1" pitch="+2st">
        ${text
          .split('.')
          .map(
            (sentence) =>
              `<prosody pitch="medium">${sentence.trim()}.</prosody>
          <break time="500ms"/>`,
          )
          .join('')}
      </prosody>
    </speak>`

  try {
    const result = await synthesizeSpeechWithRetry(complexSsmlText)
    return result
  } catch (error) {
    console.warn('Complex SSML failed, falling back to simple SSML')
    // 10-3-2024 fall back to simple SSML
    const result = await synthesizeSpeechWithRetry(simpleSsmlText)
    return result
  }
}

export default ttsGoogle
